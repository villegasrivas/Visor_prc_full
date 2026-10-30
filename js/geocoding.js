/* Búsqueda manual de direcciones; no modifica las entidades del PRC. */
function buildGeocodingUrl(query, config, bounds) {
    const url = new URL("https://api.geoapify.com/v1/geocode/search");
    const context = config.contexto || "";
    const text = query.trim();
    url.search = new URLSearchParams({
        text: context && !text.toLocaleLowerCase("es").includes(context.toLocaleLowerCase("es"))
            ? text + ", " + context : text,
        apiKey: config.apiKey.trim(), format: "json", lang: "es",
        limit: String(Math.max(1, Math.min(10, Number(config.maxResultados) || 5))),
        filter: "rect:" + bounds.join(",") + "|countrycode:" + config.pais,
        bias: "countrycode:none"
    }).toString();
    return url;
}

function isGeocodingResultInBounds(result, bounds, country) {
    return Number.isFinite(result.lon) && Number.isFinite(result.lat) &&
        result.country_code === country && result.lon >= bounds[0] &&
        result.lat >= bounds[1] && result.lon <= bounds[2] && result.lat <= bounds[3];
}

function geocodingResultDetail(result) {
    return result.result_type === "building" && result.housenumber &&
        result.rank && result.rank.confidence >= 0.9
        ? "Dirección con numeración" : "Ubicación aproximada; verifica el punto en el mapa";
}

(function () {
    const config = appConfig.herramientas.geocodificacion;
    if (!config || config.enabled !== true) return;
    const container = searchInput.parentElement;
    container.style.display = "flex";
    searchResults.style.removeProperty("display");
    searchInput.placeholder = "Buscar dirección…";
    searchInput.setAttribute("aria-label", "Buscar dirección en Nueva Imperial");
    searchInput.setAttribute("aria-controls", "search-results");
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.setAttribute("enterkeyhint", "search");
    container.querySelector(".search-icon").hidden = true;
    const submit = document.createElement("button");
    const clear = document.createElement("button");
    [submit, clear].forEach(function (button) {
        button.type = "button";
        button.className = "geocoding-button";
        container.appendChild(button);
    });
    submit.textContent = "🔍";
    submit.title = "Buscar dirección";
    submit.setAttribute("aria-label", submit.title);
    clear.textContent = "×";
    clear.title = "Limpiar dirección y marcador";
    clear.setAttribute("aria-label", clear.title);
    searchResults.setAttribute("aria-live", "polite");
    map.attributionControl.addAttribution('<a href="https://www.geoapify.com/">Powered by Geoapify</a> | <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>');
    let marker = null;
    let controller = null;
    let generation = 0;

    function hideResults() {
        clearSearchResults();
        searchInput.setAttribute("aria-expanded", "false");
    }

    function cancel() {
        generation++;
        if (controller) controller.abort();
        controller = null;
        submit.disabled = false;
        searchInput.removeAttribute("aria-busy");
    }

    function message(text) {
        hideResults();
        const row = document.createElement("div");
        row.className = "search-result-item";
        row.textContent = text;
        searchResults.appendChild(row);
        searchResults.classList.add("search-results-visible");
        searchInput.setAttribute("aria-expanded", "true");
    }

    function boundsForSearch() {
        const layer = loadedLayers[config.capaLimite];
        if (!layer || !layer.getBounds || !layer.getBounds().isValid()) return null;
        const bounds = layer.getBounds();
        const margin = Math.max(0, Number(config.margenMetros) || 0);
        const latMargin = margin / 111320;
        const lonMargin = latMargin / Math.cos(bounds.getCenter().lat * Math.PI / 180);
        return [bounds.getWest() - lonMargin, bounds.getSouth() - latMargin,
            bounds.getEast() + lonMargin, bounds.getNorth() + latMargin];
    }

    async function search() {
        cancel();
        const query = searchInput.value.trim();
        if (query.length < (config.minimoCaracteres || 3)) {
            message("Ingresa una dirección más completa.");
            return;
        }
        if (config.proveedor !== "geoapify" || !config.apiKey || !config.apiKey.trim()) {
            message("La búsqueda de direcciones aún no está habilitada por el administrador.");
            return;
        }
        const bounds = boundsForSearch();
        if (!bounds) {
            message("El límite urbano no está disponible. Intenta nuevamente cuando termine de cargar el mapa.");
            return;
        }
        const current = generation;
        const request = new AbortController();
        controller = request;
        const timeout = setTimeout(function () { request.abort(); }, config.timeoutMs || 12000);
        submit.disabled = true;
        searchInput.setAttribute("aria-busy", "true");
        message("Buscando dirección…");
        try {
            const response = await fetch(buildGeocodingUrl(query, config, bounds), { signal: request.signal });
            if (!response.ok) {
                throw new Error(response.status === 429 ? "quota" :
                    [401, 403].includes(response.status) ? "credentials" : "service");
            }
            const data = await response.json();
            if (current !== generation) return;
            if (!Array.isArray(data.results)) throw new Error("service");
            const results = data.results.filter(function (result) {
                return isGeocodingResultInBounds(result, bounds, config.pais);
            });
            if (!results.length) {
                message("Sin resultados en el área de Nueva Imperial. Revisa calle y número.");
                return;
            }
            hideResults();
            results.forEach(function (result) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "search-result-item";
                const title = document.createElement("span");
                title.className = "search-result-title";
                title.textContent = result.formatted || result.address_line1 || "Dirección";
                const detail = document.createElement("span");
                detail.className = "search-result-layer";
                detail.textContent = geocodingResultDetail(result);
                button.append(title, detail);
                button.addEventListener("click", function () {
                    if (marker) map.removeLayer(marker);
                    marker = null;
                    map.setView([result.lat, result.lon], Number(config.zoom) || 18);
                    if (config.mostrarMarcador !== false) {
                        const content = document.createElement("div");
                        content.append(title.cloneNode(true), detail.cloneNode(true));
                        marker = L.marker([result.lat, result.lon]).addTo(map).bindPopup(content).openPopup();
                    }
                    hideResults();
                    searchInput.focus();
                });
                searchResults.appendChild(button);
            });
            searchResults.classList.add("search-results-visible");
            searchInput.setAttribute("aria-expanded", "true");
        } catch (error) {
            if (current !== generation) return;
            message(error.name === "AbortError" ? "La búsqueda tardó demasiado. Intenta nuevamente." :
                error.message === "quota" ? "Se alcanzó el límite de consultas. Intenta más tarde." :
                error.message === "credentials" ? "El proveedor no autorizó la búsqueda. Contacta al administrador." :
                "No fue posible consultar direcciones. Revisa tu conexión e intenta nuevamente.");
        } finally {
            clearTimeout(timeout);
            if (current === generation) {
                controller = null;
                submit.disabled = false;
                searchInput.removeAttribute("aria-busy");
            }
        }
    }

    submit.addEventListener("click", search);
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") { event.preventDefault(); search(); }
        if (event.key === "ArrowDown") {
            const first = searchResults.querySelector("button");
            if (first) { event.preventDefault(); first.focus(); }
        }
    });
    searchInput.addEventListener("input", function () { cancel(); hideResults(); });
    clear.addEventListener("click", function () {
        cancel(); hideResults(); searchInput.value = "";
        if (marker) map.removeLayer(marker);
        marker = null;
        searchInput.focus();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") { cancel(); hideResults(); }
    });
    document.addEventListener("click", function (event) {
        if (!container.contains(event.target) && !searchResults.contains(event.target)) {
            cancel(); hideResults();
        }
    });
})();

import type { Request, Response, NextFunction, RequestHandler } from "express";

type _Options = {
    origins?: string;
    methods?: string[] | string;
    headers?: string[] | string;
    allowCredentials?: boolean;
    preflightContinue?: boolean;
};

type Header = {
    key: string;
    value: string;
};

const configureOrigins = function (req: Request, options: _Options): Header[] {
    const headers: Header[] = [];
    if (options.origins === "*") {
        headers.push({
            key: "Access-Control-Allow-Origin",
            value: "*",
        });
    } else {
        headers.push({
            key: "Access-Control-Allow-Origin",
            value: options.origins!,
        });
        headers.push({
            key: "vary",
            value: req.headers.origin as string,
        });
    }
    return headers;
};

const configureCredentials = function (
    req: Request,
    options: _Options
): Header[] {
    const headers: Header[] = [];
    headers.push({
        key: "Access-Control-Allow-Credentials",
        value: String(options.allowCredentials),
    });
    return headers;
};

const configureMethods = function (req: Request, options: _Options): Header[] {
    const headers: Header[] = [];
    const methodHeader: Header = {
        key: "Access-Control-Allow-Methods",
        value: "",
    };
    if (Array.isArray(options.methods)) {
        methodHeader.value = options.methods.join(",");
    } else {
        methodHeader.value = options.methods!;
    }
    headers.push(methodHeader);
    return headers;
};

const configureAllowedHeaders = function (
    req: Request,
    options: _Options
): Header[] {
    const headers: Header[] = [];
    const allowedHeaders: Header = {
        key: "Access-Control-Request-Headers",
        value: "",
    };
    if (Array.isArray(options.headers)) {
        allowedHeaders.value = options.headers.join(",");
    } else {
        allowedHeaders.value = options.headers!;
    }
    headers.push(allowedHeaders);
    return headers;
};

const applyHeaders = function (res: Response, headers: Header[]) {
    const _headers = new Headers();
    for (let i = 0; i < headers.length; i++) {
        _headers.append(headers[i].key, headers[i].value);
    }
    res.setHeaders(_headers);
    return;
};

/**
 * Accept pre-flighted request from any origin.
 * Source: https://fetch.spec.whatwg.org/#http-cors-protocol
 */
export const cors = function (options?: _Options): RequestHandler {
    if (!options || Object.keys(options).length === 0) {
        // default value
        options = {
            methods: "POST,GET,HEAD,PUT,PATCH,DELETE,OPTIONS",
            allowCredentials: true,
            headers: ["content-type", "authorization"],
            origins: "*",
            preflightContinue: false,
        };
    } else {
        options = {
            methods: options.methods
                ? options.methods
                : "POST,GET,HEAD,PUT,PATCH,DELETE,OPTIONS",
            allowCredentials: options.allowCredentials
                ? options.allowCredentials
                : false,
            headers: options.headers
                ? options.headers
                : ["content-type, authorization"],
            origins: options.origins ? options.origins : "*",
            preflightContinue: options.preflightContinue
                ? options.preflightContinue
                : false,
        };
    }
    return (req: Request, res: Response, next: NextFunction) => {
        const method =
            req.method && req.method.toUpperCase && req.method.toUpperCase();
        if (method === "OPTIONS") {
            // Preflight request.
            applyHeaders(res, configureOrigins(req, options));
            applyHeaders(res, configureCredentials(req, options));
            applyHeaders(res, configureMethods(req, options));
            applyHeaders(res, configureAllowedHeaders(req, options));
            if (options.preflightContinue) {
                next();
            }
            res.sendStatus(204);
            return;
        } else {
            applyHeaders(res, configureOrigins(req, options));
            applyHeaders(res, configureCredentials(req, options));
            next();
        }
    };
};

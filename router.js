function route(pathname, handle, res, productId) {
    const resourcesRegExp = /(.css|.png)$/m;
    
    if (pathname.match(resourcesRegExp)) {
        handle["getResource"](res, pathname);
    } else {
        if (typeof handle[pathname] == 'function') {
            handle[pathname](res, productId);
        } else {
            res.writeHead(404, {'Content-Type' : "text/html"});
            res.write("Page not found.");
            res.end();
        }
    }
}

exports.route = route;
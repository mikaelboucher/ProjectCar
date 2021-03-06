(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'out',

            // socket.io bundles
            'socket.io-client': 'npm:socket.io-client/dist/socket.io.js',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/animations': 'node_modules/@angular/animations/bundles/animations.umd.min.js',
			'@angular/animations/browser':'node_modules/@angular/animations/bundles/animations-browser.umd.js',
			'@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // ngx-bootstrap bundles
            'moment': 'npm:moment',
            'ngx-bootstrap': 'npm:ngx-bootstrap',

            // other libraries
            'rxjs': 'npm:rxjs',
			'chai': 'npm:chai/chai.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            'app': {
                main: './main.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            },
            'ngx-bootstrap': {
                format: 'cjs',
                main: 'bundles/ngx-bootstrap.umd.js',
                defaultExtension: 'js'
            },
            'moment': {
                main: 'moment.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);

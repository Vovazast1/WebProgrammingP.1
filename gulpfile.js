const{src,dest}=require('gulp'),
gulp=require('gulp'),
browsersync=require('browser-sync').create(),
fileinclude=require("gulp-file-include"),
del=require("del"),
scss = require('gulp-sass')(require('sass')),
autoprefixer=require("gulp-autoprefixer"),
clean_css=require("gulp-clean-css"),
rename=require("gulp-rename"),
uglify=require("gulp-uglify"),
imagemin=require("gulp-imagemin"),
ttf2woff=require("gulp-ttf2woff"),
ttf2woff2=require("gulp-ttf2woff2"),
fonter=require("gulp-fonter");


const buildFolder="dist";
const srcFolder="src";

const path={
    build:{
        html:buildFolder + "/",
        css:buildFolder + "/css/",////
        js:buildFolder + "/js/",
        img:buildFolder + "/img/",
        fonts:buildFolder + "/fonts/",
        json:buildFolder+"/"
    },
    src:{
        html:[srcFolder + "/*.html","!"+srcFolder + "/_*.html"],
        css:srcFolder + "/scss/style.scss",
        js:srcFolder + "/js/script.js",
        img:srcFolder + "/img/**/*.{jpeg,png,svg,gif,ico,webp}",
        fonts:srcFolder + "/fonts/*.ttf"   ,
        json:srcFolder+"/*.json"       
    },
    watch:{
        html:srcFolder + "/**/*.html",
        css:srcFolder + "/scss/**/*.scss",
        js:srcFolder + "/js/**/*.js",
        img:srcFolder + "/img/**/*.{jpeg,png,svg,gif,ico,webp}",
        json:srcFolder+"/**/*.json"
    },
    clean: "./"+ buildFolder +"/"
}

function fonts(){
    src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
   return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}

function browserSync(params){
   browsersync.init({
        server:{
            baseDir: "./"+ buildFolder +"/",
        },
        port:3000,
        notify:false
    })
}

function json(){
return src(path.src.json)
.pipe(dest('dist/'));
}

function html(){
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}


function clean(params){
    return del(path.clean);
}

function css(){
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle:"expanded"
        })
    )
    .pipe(autoprefixer({
            overrideBrowserslist:["last 5 version"],
            cascade:true
    }) )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
       .pipe(rename({
        extname:".min.css"
       }))     
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(
        uglify()
        )
    .pipe(rename({
        extname:".min.js"
       }))   
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images(){
    return src(path.src.img)
    .pipe(
        imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            interlaced:true,
            optimizationLevel:3
        })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

gulp.task('otf2ttf',function(){
    return src([srcFolder+'/fonts/*.otf'])
    .pipe(fonter({
        formats:['ttf']
    }))
    .pipe(dest(srcFolder+'/fonts/'));
})

function watchFiles(){
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.css],css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.img],images);
    gulp.watch([path.watch.img],json);

}


const build=gulp.series(clean,gulp.parallel(html,css,js,images,fonts,json));
const watch=gulp.parallel(build,watchFiles,browserSync);

exports.json=json;
exports.fonts=fonts;
exports.images=images;
exports.js=js;
exports.css=css;
exports.html=html;
exports.build=build;
exports.watch=watch;
exports.default=watch;
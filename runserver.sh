backend() {
    cd server || exit;
    python3 manage.py runserver
}
frontend() {
    cd web-components || exit;
    npx @angular/cli build --watch;
}

backend & frontend && fg;

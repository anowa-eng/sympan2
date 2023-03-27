backend() {
    cd server || exit
    python3 manage.py runserver | sed "s/^/$(tput setaf 4)$(tput bold)(Server)  $(tput sgr0)/"
}
frontend() {
    cd web-components || exit
    npx @angular/cli build --watch | sed "s/^/$(tput setaf 4)$(tput bold)(Components)  $(tput sgr0)/"
}
pipe-bash() {
    read -rp "$(tput setaf 2)(Exec) $(tput sgr0)" cmd
    sh -c "$cmd"
}
listen-for-bash() {
    while true; do
        read -n 1 char
        if [[ $char == 'b' ]]; then
            echo -ne "\r\033[K"
            pipe-bash
        fi
    done
}

display-line() {
    for ((i=1; i<=(($cols / 2) - 2 - $(expr length "$str")); i++)); do
        echo -n "═"
    done
}

clear
cols=$(tput cols)
str="Running sympan2 server"
display-line
echo -n " $str "
display-line
echo "

Press b to run the Bash shell.

"

backend & frontend & listen-for-bash

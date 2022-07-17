#!/usr/bin/env bash
#
# Deploy the contents in the dist directory to the gh-pages branch.
#
# * Prerequistes
#   - no stage
#   - /tmp direcotry available
#   - gh-pages branch exists
#
set -eu
umask 0022


readonly SCRIPT_NAME=$(basename $0)
readonly BRANCH_MAIN=main
readonly BRANCH_DEPLOY=gh-pages


#
# Setup temp dir
#
unset TMP_DIR
on_exit() {
    [[ -n "${TMP_DIR}" ]] && rm -rf "${TMP_DIR}";
}
trap on_exit EXIT
trap 'trap - EXIT; on_exit; exit -1' INT PIPE TERM
readonly TMP_DIR=$(mktemp -d "/tmp/${SCRIPT_NAME}.tmp.XXXXXX")


#
# main
#
main() {
    # cd root dir
    cd $(dirname $0)/..

    # checkout main branch
    git fetch origin $BRANCH_MAIN
    git checkout $BRANCH_MAIN

    # update dist
    docker-compose run --rm app yarn
    docker-compose run --rm app yarn build

    # store
    cp -R ./dist $TMP_DIR/dist

    # checkout gh-pages branch
    git fetch origin $BRANCH_DEPLOY
    git checkout $BRANCH_DEPLOY

    # remove old files
    for f in $(ls -A .); do
        if [ "$f" = ".git" ]; then
            : # skip
        else
            rm -rf "./$f"
        fi
    done

    # deploy files & commit to gh-pages branch
    cp -r $TMP_DIR/dist/. ./
    git add .
    git cm -m "dist update"
    git push
    echo "Update $BRANCH_DEPLOY branch"

    # Switch to main branch & Recovery dist dir
    git checkout $BRANCH_MAIN
    cp -R $TMP_DIR/dist ./

    echo "Finish"
}

main $@


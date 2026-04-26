pipeline {
    agent any
    stages {
        stage('Fetch Code') {
            steps {
                checkout scm
            }
        }
        stage('Build & Archive') {
            steps {
                echo 'Archiving artifacts...'
                archiveArtifacts artifacts: '**/*.html, **/*.css, **/*.js', followSymlinks: false
            }
        }
    }
}

pipeline {
    agent any

    environment {
        // Define the default URL where the server will be accessible during the tests
        SERVER_URL = 'https://github.com/wangqixian15/myproject03.git'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checks out the source code from your Git repository
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }
        stage('Start Server') {
            steps {
                // Start the server in the background
                sh 'nohup npm start > server.log 2>&1 &'
                // Add a delay to ensure the server has time to start before tests run
                sh 'sleep 10'
            }
        }
        stage('Run UI Tests') {
            steps {
                // Run your UI tests
                sh 'npm run test:ui'
            }
        }
    }

    post {
        always {
            // Kill the server process after tests have finished in any case
            sh 'pkill -f "node server.js"'
            // Optionally archive the server logs for debugging
            archiveArtifacts artifacts: 'server.log', onlyIfSuccessful: true
        }
        success {
            // Actions to take on successful completion of pipeline
            echo 'UI Tests passed successfully.'
        }
        failure {
            // Actions to take if the pipeline fails
            echo 'UI Tests failed. Check the server logs for more details.'
            // Optionally output the last part of the server logs
            sh 'tail -n 50 server.log'
        }
    }
}

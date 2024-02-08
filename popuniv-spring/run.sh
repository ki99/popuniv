#!/bin/bash
(sleep 30; ./gradlew buildAndReload --continuous -PskipDownload=true -x Test)&
./gradlew bootRun -PskipDownload=true -Dspring.profiles.active=development

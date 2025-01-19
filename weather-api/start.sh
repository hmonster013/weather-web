# mvn clean spring-boot:run -Dspring.profiles.active=prod
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n" -Dspring.profiles.active=prod

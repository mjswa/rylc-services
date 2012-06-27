# README zu RYLC-SERVICES #

Beispielcode zum Kapitel 7 Backendkommunikation im Buch [Mobile Web-Apps mit JavaScript](opitz-consulting.com/go_javascriptbuch).

*   Voraussetzungen:
    *   Java Development Kit 1.6 oder neuer.
    *   Apache Maven 3.0.4 oder neuer.
*   Bauen der Backend-Komponente:
    *   [rylc-backend](https://github.com/mjswa/rylc-backend) klonen
    *   In das Verzeichnis `rylc-backend-jar` wechseln
    *   Das Backend mittels `mvn clean install -Pproduction` bauen
*   Bauen des Projekts inkl. Integrationstests: `mvn clean verify -Pintegration`.
    Dazu muss [Chrome](http://www.google.com/chrome) über den 
    Kommandozeilen-Befehl `chrome` gestartet werden können.
    Alternativ kann die Property `browser` in `pom.xml` angepasst und dort der
    gewünschte Befehl zum Starten von Chrome eingetragen werden.
*   Manuelles Starten und Ausführen der Tests:
    1.   Jetty starten mittels `mvn jetty:run`.
    1.   Zum Ausführen von Unit Tests in Chrome den [Unit Spec Runner](http://localhost:8585/rylc-services/UnitSpecRunner.html) aufrufen.
    1.   Zum Ausführen von UI Tests in Chrome den [UI Spec Runner](http://localhost:8585/rylc-services/UiSpecRunner.html) aufrufen.
*   Starten und Aufrufen der Web-App
    1.   Jetty starten mittels `mvn jetty:run`.
    1.   [Startseite](http://localhost:8585/rylc-services) der App aufrufen.
    1.   Mit Benutzername `fred` und Password `pass` anmelden.
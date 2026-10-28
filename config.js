/*
  Konfiguracja Firebase (synchronizacja między telefonem a komputerem).
  Skąd ją wziąć: Firebase → ikona koła zębatego → Ustawienia projektu → Twoje aplikacje → aplikacja webowa → „Konfiguracja SDK”.
  Te wartości nie są tajne: dostęp do danych chronią reguły z pliku firestore.rules.
  Dopóki tu jest „WKLEJ_TUTAJ”, aplikacja działa bez konta i zapisuje dane tylko na tym urządzeniu.
*/
window.FORMA_FIREBASE = {
  apiKey: "WKLEJ_TUTAJ",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

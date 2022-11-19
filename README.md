## Opis zadania

**Algorytm Bruckera **stosujemy aby zminimalizować opóźnienie wykonywanych równolegle zadań. Jego złożoność obliczeniowa to **O(nlog n**). Przebieg algorytmu możemy zilustrować następująco:
1. Bierzemy zadanie, które nie ma następnika (tzn. nie jest od niego zależne żadne kolejne zadanie) i wyliczamy dla niego liczbę **d***:
   **d* = 1 - d**
   gdzie d to planowany czas wykonania zadania.
2. Następnie bierzemy wszystkie zadania od których jest ono zależne i wyliczamy parę (**d\*<sub>1</sub>,d\*<sub>2</sub>**):
   **d\*<sub>1</sub> = 1 - d
   d\*<sub>2</sub> = 1 + d\*prev**
   i wybieramy **d\* = max(d\*<sub>1</sub>,d\*<sub>2</sub>)** gdzie **d\*** to maksymalna liczba z pary **(d\*<sub>1</sub>,d\*<sub>2</sub>)** dla danego kroku.
3. Gdy policzymy wartości dla każdego zadania to szeregujemy je w malejącej kolejności **max(d\*<sub>1</sub>,d\*<sub>2</sub>)** i zapisujemy z zachowaniem ograniczenia kolejnościowego zadań.
4. Dla każdego zadania sprawdzamy w którym momencie się wykonało i odejmujemy od tej wartości oczekiwany czas wykonania. Największa z liczb które nam wyjdą to **L<sub> max</sub>**, czyli maksymalne opóźnienie.

## Uruchomienie aplikacji
Najłatwiejszym sposobem jest instalacja **Dockera** na dowolnym systemie operacyjnym, który go wspiera, np. korzystając z Docker Desktop, którego można znaleźć pod linkiem https://docs.docker.com/desktop/. Następnie, znajdując się w głównym folderze projektu należy uruchomić komendy w np. PowerShellu lub terminalu:
```powershell
docker-compose up -d --build
docker-compose up
```
Pierwsza komenda może zająć chwilę, ze względu na czas potrzebny na ściągniecie i zbudowanie obrazu. Druga powinna zająć chwilę, po której aplikacja będzie dostępna pod http://localhost:3001/.

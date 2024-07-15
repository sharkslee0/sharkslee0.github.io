---
title: "[백준/BOJ] 5549. 행성 탐사 (파이썬)"
date: 2024-04-01
tags:
  - PS
  - BOJ
  - 백준
  - Python
  - 누적합
---

## ☘️ 문제

https://www.acmicpc.net/problem/5549

## ☘️ 풀이

주어진 공간안에 각각 "J", "O", "I"가 몇 개씩 있는지 일일이 세보는 것도 방법이지만, 시간 초과가 발생합니다.

**누적합**을 사용해서 최적화할 수 있습니다.

현재까지 "J", "O", "I"가 몇 번씩 등장했는지 기록하기 위한 2차원 배열 `boardCount`를 선언합니다.

- 현재의 boardCount은 왼쪽의 boardCount과 위쪽의 boardCount을 더하고 왼쪽 위의 boardCount 값을 빼면 됩니다. 왼쪽의 boardCount와 위쪽의 boardCount에 왼쪽 위의 boardCount가 중복되기 때문입니다.
- 현재 위치에 있는 지형에 따라 boardCount를 하나 더합니다.

k번 들어오는 조사 영역 구간에 대해 "J", "O", "I"가 몇 번 등장했는지 구하면 됩니다. 누적합으로 구해진 boardCount를 이용해서 구할 수 있습니다.

<figure>
    <img src="img/boj-5549-01.jpg">
</figure>

`boardCount[a][b]`의 값은 (1, 1)부터 (a, b)의 구역안에 있는 지형의 갯수를 뜻합니다. 따라서, (a, b)와 (c, d) 사이의 구역안에 있는 지형의 갯수를 구하기 위해서는 전체 구역인 ④에서 이외의 구역인 ②, ③을 빼주고 두 번 빠진 ①을 한 번 더해줘야 합니다.

## ☘️ 전체 코드 (파이썬)

```python
import sys

input = sys.stdin.readline


n, m = map(int, input().split())
k = int(input())
board = [list(input().strip()) for _ in range(n)]
boardCount = [[[0, 0, 0] for _ in range(m + 1)] for _ in range(n + 1)]
for i in range(1, n + 1):
    for j in range(1, m + 1):
        for t in range(3):
            boardCount[i][j][t] = boardCount[i - 1][j][t] + boardCount[i][j - 1][t] - boardCount[i - 1][j - 1][t]
        if board[i - 1][j - 1] == "J":
            boardCount[i][j][0] += 1
        elif board[i - 1][j - 1] == "O":
            boardCount[i][j][1] += 1
        elif board[i - 1][j - 1] == "I":
            boardCount[i][j][2] += 1

for _ in range(k):
    a, b, c, d = map(int, input().split())
    result = [0] * 3
    for i in range(3):
        result[i] = boardCount[c][d][i] - boardCount[c][b - 1][i] - boardCount[a - 1][d][i] + boardCount[a - 1][b - 1][i]

    print(*result)
```

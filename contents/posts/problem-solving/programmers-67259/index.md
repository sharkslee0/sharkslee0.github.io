---
title: "[프로그래머스] 67259. 경주로 건설 (파이썬)"
date: 2024-04-03
tags:
  - PS
  - 프로그래머스
  - Python
  - BFS
---

## ☘️ 문제

[프로그래머스

코드 중심의 개발자 채용. 스택 기반의 포지션 매칭. 프로그래머스의 개발자 맞춤형 프로필을 등록하고, 나와 기술 궁합이 잘 맞는 기업들을 매칭 받으세요.

programmers.co.kr](https://school.programmers.co.kr/learn/courses/30/lessons/67259)

## ☘️ 풀이

그냥 직진으로 이동하느냐, 90도로 꺾고 이동하느냐에 따라 더해지는 비용이 다릅니다. 따라서 현재 위치까지 올 수 있는 최소 비용을 방향에 따라 각각 따로 저장해야 합니다.

보통의 BFS 문제에서는 단순히 현재 위치까지 올 수 있는 최소 비용을 저장하는데, 이 문제에서는 움직이는 방향에 따라 비용이 달라지기 때문에 예외 상황이 발생합니다.

## ☘️ 전체 코드 (파이썬)

```python
from collections import deque

dy = (0, 1, 0, -1)
dx = (1, 0, -1, 0)

INF = float("inf")


def getCost(visited, y, x, prevDir, currDir):
    if prevDir == -1:
        return 100
    elif prevDir == currDir:
        return visited[y][x][prevDir] + 100
    else:
        return visited[y][x][prevDir] + 600


def solution(board):
    n = len(board)

    visited = [[[INF] * 4 for _ in range(n)] for _ in range(n)]
    visited[0][0] = [0] * 4
    que = deque()
    que.append((0, 0, -1))
    answer = INF

    while que:
        y, x, prevDir = que.popleft()

        if (y, x) == (n - 1, n - 1):
            answer = min(answer, visited[n - 1][n - 1][prevDir])
            continue

        for i in range(4):
            ny = y + dy[i]
            nx = x + dx[i]
            cost = getCost(visited, y, x, prevDir, i)
            if 0 <= ny < n and 0 <= nx < n and board[ny][nx] == 0 and cost < visited[ny][nx][i]:
                visited[ny][nx][i] = cost
                que.append((ny, nx, i))

    return answer
```

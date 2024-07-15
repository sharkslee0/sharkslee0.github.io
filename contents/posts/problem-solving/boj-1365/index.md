---
title: "[백준/BOJ] 1365. 꼬인 전깃줄 (파이썬)"
date: 2024-04-03
tags:
  - PS
  - BOJ
  - 백준
  - Python
  - 다이나믹프로그래밍
  - 이분탐색
  - LIS
---

## ☘️ 문제

[1365번: 꼬인 전깃줄

첫 줄에 전봇대의 개수 N(1 ≤ N ≤ 100,000)이 주어지고, 이어서 N보다 작거나 같은 자연수가 N개 주어진다. i번째 줄에 입력되는 자연수는 길 왼쪽에 i번째 전봇대와 연결된 길 오른편의 전봇대가

www.acmicpc.net](https://www.acmicpc.net/problem/1365)

## ☘️ 풀이

대표적인 LIS(최장 증가 부분 수열) 문제입니다.

전깃줄이 꼬여있지 않기 위해서는 오른편에서 연결된 전봇대 번호가 순서대로 증가해야 합니다. 예를 들어 오른편의 전봇대 중에서 선택된 전봇대의 번호가 `2 4 1`라면, 2와 4를 연결할 때 꼬이게 됩니다. 또한, N이 최대 10만이기 때문에 이분탐색을 활용한 LIS 문제로 풀어야 합니다.

문제에서는 잘라내야 할 전선의 수를 구해야 하기 때문에, 전체 전선의 수(N)개에서 LIS의 길이를 빼면 됩니다.

## ☘️ 전체 코드 (파이썬)

```python
import sys

input = sys.stdin.readline


def lowerBound(lis, target):
    left, right = 0, len(lis) - 1
    while left < right:
        mid = (left + right) // 2
        if lis[mid] < target:
            left = mid + 1
        else:
            right = mid
    return right


n = int(input())
numbers = list(map(int, input().split()))

lis = [numbers[0]]
for i in range(1, n):
    if lis[-1] < numbers[i]:
        lis.append(numbers[i])
    else:
        index = lowerBound(lis, numbers[i])
        lis[index] = numbers[i]

print(n - len(lis))
```

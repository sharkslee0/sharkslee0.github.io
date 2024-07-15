---
title: "[백준/BOJ] 2283. 구간 자르기 (파이썬)"
date: 2024-04-08
tags:
  - PS
  - BOJ
  - 백준
  - Python
  - 투포인터
  - 누적합
---

## ☘️ 문제

https://www.acmicpc.net/problem/2283

## ☘️ 풀이

한 점에 그 점을 포함하는 구간이 몇 개나 있는지를 확인하는 것이 중요합니다. 예를 들어, 2인 점을 포함하는 구간이 3개가 있다고 해보겠습니다. 정답이 되는 구간이 2를 포함하고 있지 않다가 2를 포함하게 되면, 구간에 포함된 길이의 합은 2를 포함하는 구간의 갯수인 3만큼 증가하게 됩니다. 반대로 2를 포함하지 않게 된다면, 3만큼 감소하게 됩니다.

정답이 되는 구간 [a, b]에 포함된 길이의 총합은 누적합을 이용해 구합니다. 구간 [0, a]에 포함된 길이의 총합에서 구간 [0, a + 1]에 포함된 길이의 총합을 구할 때 필요한 것은 `a + 1`인 점을 포함하는 구간이 몇 개가 있느냐 입니다. 그럼 그 갯수만큼 늘어나게 됩니다.

`counts` 배열을 선언하여 입력받는 구간이 언제 시작하고 언제 끝나는지 저장합니다. 시작점은 구간의 갯수를 하나 늘어나는 것이기 때문에 +1을 하고 끝점은 갯수가 줄어드는 것이기 때문에 -1을 합니다. 순회하면서 `currCount`에 계속 더해주면 `currCount`는 현재 점을 포함하는 구간의 갯수를 가지게 됩니다. 그리고 `currCount` 값을 이용해서 0부터 지금까지의 길이의 총합을 누적합으로 구합니다.

이후는 단순한 투포인터입니다. 누적합으로 구해진 `accSum`을 이용해서 현재 구간에 포함된 길이의 총합을 구합니다. 만약, 현재 길이의 총합이 `k`보다 부족하다면 `right`를 하나 늘려 구간을 더 포함시켜 봅니다. 반대로 현재 길이의 총합이 `k`보다 크다면 `left`를 하나 늘려 구간을 좁힙니다.

## ☘️ 전체 코드 (파이썬)

```python
import sys

input = sys.stdin.readline


n, k = map(int, input().split())
accSum = [0] * 1000002
counts = [0] * 1000002
MAX = -1

for _ in range(n):
    start, end = map(int, input().split())
    counts[start] += 1
    counts[end] -= 1
    MAX = max(MAX, end)

currCount = counts[0]
for i in range(1, 1000002):
    accSum[i] = accSum[i - 1] + currCount
    currCount += counts[i]

left, right = 0, 0
while left < MAX + 1 and right < MAX + 1:
    s = accSum[right] - accSum[left]
    if s == k:
        break
    elif s < k:
        right += 1
    else:
        left += 1

if s == k:
    print(left, right)
else:
    print(0, 0)
```

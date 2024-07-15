---
title: "[백준/BOJ] 13144. List of Unique Numbers (파이썬)"
date: 2024-04-01
tags:
  - PS
  - BOJ
---

## ☘️ 문제

https://www.acmicpc.net/problem/13144

## ☘️ 풀이

조합이나 이중 반복문으로 구간을 잡고 그 구간에 반복되는 숫자가 있는지 검사하는 방법으로 문제를 해결할 수 있습니다. 하지만 이런 방법으로는 시간 초과가 발생할 것입니다. 이중 반복문으로 구간을 잡는다면, 구간을 잡고 그 안에서 검사하기 위해 반복문이 한번 더 필요하기 때문에 총 삼중 반복문이 동작합니다.

**투포인터**를 사용해서 구간을 잡고 하나씩 이동해가며 새로 이동한 숫자가 다시 등장한 숫자인지 새로 등장한 숫자인지 판단하면 됩니다.

구간 안에 숫자가 포함되었는지 판단하기 위한 배열(`isVisited`)이 필요합니다. `left`와 `right`의 값을 각각 0으로 두고 다음과 같이 동작합니다.

- `right`의 숫자가 아직 등장하지 않은 새로운 숫자인 경우
  1.  `isVisited`에 포함됨을 표시합니다.
  2.  정답(`answer`)에 새로이 만들 수 있는 구간 조합의 갯수를 더합니다.  
      지금까지 만들어진 구간이 `1 4 5`(길이 3)이고 구간에 새로 들어오는 숫자가 `7`(길이 1)이라면, 새로 만들 수 있는 구간 조합의 갯수는 새로 만들어지는 구간의 길이(4)만큼 만들어집니다. (`1 7`, `4 7`, `5 7`, `7`) `left`와 `right`를 모두 포함하는 구간의 길이는 `right + 1 - left`입니다.
  3.  right를 하나 이동합니다.
- `right`의 숫자가 이전에 등장한 숫자인 경우
  1.  `left`를 이동시키기 전에 `left`의 숫자는 구간에서 나오게 되기 때문에 `isVisited`에서 포함되지 않음으로 표시합니다.
  2.  `left`를 하나 이동합니다.

## ☘️ 전체 코드 (파이썬)

```python
import sys

input = sys.stdin.readline


n = int(input())
numbers = list(map(int, input().split()))
isVisited = [False] * 100001

left, right = 0, 0
answer = 0

while left < n and right < n:
    if not isVisited[numbers[right]]:
        isVisited[numbers[right]] = True
        answer += right + 1 - left
        right += 1
    else:
        isVisited[numbers[left]] = False
        left += 1

print(answer)
```

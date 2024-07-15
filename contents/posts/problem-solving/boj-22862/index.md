---
title: "[백준/BOJ] 22862. 가장 긴 짝수 연속한 부분 수열 (large) (파이썬)"
date: 2024-04-01
tags:
  - PS
  - BOJ
  - 백준
  - Python
  - 투포인터
---

## ☘️ 문제

https://www.acmicpc.net/problem/22862

## ☘️ 풀이

조합이나 이중 반복문으로 구간을 잡고 그 구간이 홀수를 최대 k번 포함하는지 판단하여 문제를 해결할 수 있습니다. 하지만 이런 방법으로는 시간 초과가 발생할 것입니다. 이중 반복문으로 구간을 잡는다면, 구간을 잡고 그 안에서 홀수 갯수를 검사하기 위해 반복문이 한번 더 필요하기 때문에 총 삼중 반복문이 동작합니다.

**투포인터**를 이용해서 구간을 잡고 하나씩 이동해보며 최장 길이를 구하면 됩니다. 홀수를 k번 삭제할 수 있다는 것은 구간에 홀수를 최대 k개까지 포함할 수 있다는 뜻입니다. 지금까지 삭제(포함)한 횟수를 기록하기 위한 `count` 변수를 선언했습니다.

- `left`의 숫자가 홀수인 경우
  - `left`를 하나 이동시킵니다.
  - `right`가 `left`보다 더 큰 경우(오른쪽에 있는 경우)면 상관없지만, 더 작은 경우(왼쪽에 있는 경우)에는 `left`와 맞춰줍니다.
  - 이전에 삭제한 적이 있다면, `count`의 횟수를 하나 줄입니다.
- `right`의 숫자가 짝수인 경우
  - 현재 구간의 길이를 구하고 지금까지의 최대 길이와 비교하여 갱신합니다.  
    구해야 하는 구간은 홀수가 제외된 짝수들의 구간입니다. 현재 구간의 길이에서 `count`(구간에 포함된 홀수의 갯수)만큼 빼주어야 합니다. 즉, 현재 짝수로 이루어져 있는 연속한 부분 수열의 길이는 `right + 1 - left - count`입니다.
  - `right`를 하나 이동시킵니다.
- `right`의 숫자가 홀수인데, 아직 더 삭제할 수 있는 경우 = 아직 더 길이를 늘려볼 수 있는 경우
  - `right`에 해당하는 홀수를 삭제(포함)합니다. → `count + 1`
  - `right`를 하나 이동시킵니다.
- `right`의 숫자가 홀수인데, 더이상 삭제하지 못하는 경우
  - `left`를 하나 이동시킵니다.

## ☘️ 전체 코드 (파이썬)

```python
import sys

input = sys.stdin.readline


n, k = map(int, input().split())
numbers = list(map(int, input().split()))

left, right = 0, 0
answer = 0
count = 0

while left < n and right < n:
    if numbers[left] % 2 != 0:
        left += 1
        right = max(left, right)
        count = max(0, count - 1)
    elif numbers[right] % 2 == 0:
        answer = max(answer, right + 1 - left - count)
        right += 1
    elif count < k:
        right += 1
        count += 1
    else:
        left += 1


print(answer)
```

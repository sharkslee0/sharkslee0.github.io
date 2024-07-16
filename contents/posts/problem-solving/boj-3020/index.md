---
title: "[백준/BOJ] 3020. 개똥벌레 (파이썬/자바)"
date: 2024-04-03
category: "Problem Solving"
tags:
  - PS
  - BOJ
  - 백준
  - Python
  - Java
  - 누적합
---

## ☘️ 문제

https://www.acmicpc.net/problem/3020

## ☘️ 풀이

높이가 n인 장애물은 1~n 사이의 높이로 날아가는 경우에도 모두 부딪히게 됩니다. 예를 들어, 높이가 4인 장애물은 높이 1로 날라가도, 높이 2로 날라가도, 높이 3으로 날라가도, 높이 4로 날라가도 모두 부딪힙니다. 이를 이용해서 우선 각 높이들의 갯수을 모두 입력 받은 다음, 각 장애물의 높이보다 낲은 높이에도 모두 갯수를 표시합니다.

배열에 각 높이의 갯수를 저장합니다. 입력되는 높이들의 갯수를 저장합니다. 이후, 높이의 역순(4→3→2→1)으로 누적합을 진행합니다. 석순과 종유석은 기준점이 다를 뿐이기 때문에, 우선 각각 똑같이 진행한 후, 나중에 높이의 기준점만 맞춰주면 됩니다.

이제 각 높이를 순회하면서 부딪히는 장애물의 갯수를 세어주면 됩니다. 석순(`bottom`)의 높이가 `height`인 경우, 종유석(`top`)의 높이는 `h - height + 1`입니다.

## ☘️ 전체 코드 (파이썬)

```python
import sys

input = sys.stdin.readline

INF = float("inf")


n, h = map(int, input().split())

bottom = [0] * (h + 1)
top = [0] * (h + 1)

for i in range(n):
    _h = int(input())
    if i % 2 == 0:
        bottom[_h] += 1
    else:
        top[_h] += 1

for i in range(h, 1, -1):
    bottom[i - 1] += bottom[i]
    top[i - 1] += top[i]

answer = INF
count = 0

for height in range(1, h + 1):
    cnt = bottom[height] + top[h - height + 1]

    if cnt < answer:
        answer = cnt
        count = 1
    elif answer == cnt:
        count += 1

print(answer, count)
```

## ☘️ 전체 코드 (자바)

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int n, h;
    static int[] bottom, top;
    static int answer, count;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();

        StringTokenizer st = new StringTokenizer(br.readLine());
        n = Integer.parseInt(st.nextToken());
        h = Integer.parseInt(st.nextToken());

        bottom = new int[h + 1];
        top = new int[h + 1];
        for (int i = 0; i < n; i++) {
            int height = Integer.parseInt(br.readLine());
            if (i % 2 == 0) {
                bottom[height] += 1;
            } else {
                top[height] += 1;
            }
        }

        for (int i = h; i > 1; i--) {
            bottom[i - 1] += bottom[i];
            top[i - 1] += top[i];
        }

        answer = Integer.MAX_VALUE;
        count = 0;
        for (int height = 1; height < h + 1; height++) {
            int breakCount = bottom[height] + top[h - height + 1];

            if (breakCount < answer) {
                answer = breakCount;
                count = 1;
            } else if (breakCount == answer) {
                count += 1;
            }
        }

        sb.append(answer).append(" ").append(count);
        System.out.println(sb);
    }
}
```

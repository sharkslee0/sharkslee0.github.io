---
title: "[백준/BOJ] 11066. 파일 합치기 (파이썬/자바)"
date: 2024-04-03
tags:
  - PS
  - BOJ
  - 백준
  - Python
  - Java
  - 다이나믹프로그래밍
---

## ☘️ 문제

https://www.acmicpc.net/problem/11066

## ☘️ 풀이

(C1, C2, C3, C4)로 묶인 임시 파일과 (C5, C6)으로 묶인 임시 파일은 합치는 경우, 발생하는 비용은 C1 + C2 + ... + C6 입니다. 이렇게 합칠 때마다, 구성 요소들의 파일 크기들을 모두 더하게 됩니다. 연속된 파일들끼리 합치기 때문에 **누적합**을 이용해서 최적화를 할 수 있습니다.

연속된 파일끼리 합치기 때문에 $$C_{start}$$부터 $$C_{end}$$까지 합치는 비용을 다음과 같이 표현할 수 있습니다.

> $$C_{start}$$부터 $$C_{end}$$까지 합치는 비용 = $$C_{start}$$부터 $$C_{mid}$$까지 합치는 비용 + $$C_{mid + 1}$$부터 $$C_{end}$$까지 합치는 비용 + $$C_{start}$$부터 $$C_{end}$$까지의 파일 크기 합 (단, start <= mid <= end)

$$C_{start}$$부터 $$C_{end}$$까지의 파일 크기 합은 고정되어 있습니다. 따라서, $$C_{start}$$부터 $$C_{end}$$까지 합치는 비용의 최소 값을 구하기 위해서는 [ $$C_{start}$$부터 $$C_{mid}$$까지 합치는 비용 + $$C_{mid + 1}$$부터 $$C_{end}$$까지 합치는 비용 ]의 최소 값을 구해야 합니다. (약간 플로이드-워셜 알고리즘이랑 비슷한 느낌) mid 값을 start와 end 사이에서 하나씩 옮기며 최소 값을 구하면 됩니다.

C4부터 C6까지 합치는 최소 비용을 구했다고 했을 때, 이 값은 C4부터 C6을 포함하는 구간의 합치는 최소 비용을 구할 때도 사용됩니다. (예를 들어, C1 ~ C7, C2 ~ C6, ...) 이점에서 **DP**를 생각해볼 수 있습니다. dp 배열의 값은 다음과 같이 정의했습니다.

> `dp[i][j]` : `i`부터 `j`까지 합치는 최소 비용

각각 파일 크기를 알고 있기 때문에, 하나씩 합쳐보며 합치는 길이를 늘립니다. 이렇게 bottom-up 방식으로 dp 배열을 채웁니다. 우리가 구해야 하는 $$C_1$$부터 $$C_K$$까지 합치는 최소 비용인 `dp[1][k]`을 구하면 됩니다.

## ☘️ 전체 코드 (파이썬)

```python
import sys

input = sys.stdin.readline


tc = int(input())
for _ in range(tc):
    k = int(input())
    fs = [0] + list(map(int, input().split()))
    dp = [[0] * (k + 1) for _ in range(k + 1)]
    s = [0] * (k + 1)
    for i in range(1, k + 1):
        s[i] = s[i - 1] + fs[i]

    for length in range(1, k + 1):
        for start in range(1, k - length + 1):
            dp[start][start + length] = (
                min(
                    [
                        dp[start][start + t] + dp[start + t + 1][start + length]
                        for t in range(length)
                    ]
                )
                + s[start + length]
                - s[start - 1]
            )

    print(dp[1][k])
```

## ☘️ 전체 코드 (자바)

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int tcs, k;
    static int[] cost;
    static int[][] dp;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        StringTokenizer st;

        tcs = Integer.parseInt(br.readLine());
        for (int tc = 0; tc < tcs; tc++) {
            k = Integer.parseInt(br.readLine());
            st = new StringTokenizer(br.readLine());
            cost = new int[k + 1];
            for (int i = 1; i < k + 1; i++) {
                cost[i] = cost[i - 1] + Integer.parseInt(st.nextToken());
            }

            dp = new int[k + 1][k + 1];
            for (int length = 1; length < k + 1; length++) {
                for (int start = 1; start < k - length + 1; start++) {
                    int end = start + length;
                    dp[start][end] = getMinCost(start, end, length) + (cost[end] - cost[start - 1]);
                }
            }

            sb.append(dp[1][k]).append("\n");
        }

        System.out.println(sb);
    }

    private static int getMinCost(int start, int end, int length) {
        int result = Integer.MAX_VALUE;
        for (int mid = 0; mid < length; mid++) {
            result = Math.min(result, dp[start][start + mid] + dp[start + mid + 1][end]);
        }
        return result;
    }
}
```

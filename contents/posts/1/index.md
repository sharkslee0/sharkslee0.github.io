---
title: "[번역] Collection의 공식 문서 읽기"
# description: "Collection의 Javadoc을 읽어보자"
date: 2023-09-19
update: 2023-09-19
tags:
  - Java Collections Framework
  - Collection
  - JCF
  - 자바
  - 컬렉션
  - Javadoc
  - 공식 문서
series: "[번역] Java Collections Framework의 공식 문서 읽기"
---

> 이 글은 자바 컬렉션 프레임워크(Java Collections Framework)에 포함된 여러 인터페이스와 클래스의 Javadoc 문서를 읽고 번역한 글입니다. 번역은 대부분 제가 직접 했고 일부 ChatGPT의 도움을 받았습니다. 의미를 구분하거나 분명히 해야 하는 경우에는 영문을 그대로 남겼습니다. 어색한 표현이나 수정해야 할 부분은 댓글로 남겨주시면 감사드리겠습니다.

## Collection

`Collection` 계층의 루트 인터페이스입니다. 컬렉션은 객체(컬렉션의 요소)의 집합을 표현합니다. 어떤 컬렉션은 중복된 요소를 허용하고, 어떤 컬렉션은 허용하지 않습니다. 어떤 컬렉션은 정렬되어 있고, 어떤 컬렉션은 정렬되어 있지 않습니다. JDK는 이 인터페이스의 직접적인 구현체를 제공하지 않습니다. `Set`이나 `List` 같은 조금 더 구체적인 서브 인터페이스의 구현체를 제공합니다. 이 인터페이스는 일반적으로 컬렉션은 전달하고 일관되게 조작할 수 있도록 사용됩니다.

`Bags`나 `multisets` (중복된 요소를 포함하는 정렬되지 않은 컬렉션)은 이 인터페이스를 직접적으로 구현해야 합니다.

모든 범용적인 컬렉션 구현 클래스(일반적으로 `Collection`의 서브 인터페이스 중 하나를 통해 `Collection`을 구현합니다.)는 두 개의 “표준” 생성자를 제공해야 합니다. 빈(empty) 컬렉션을 생성하는 void 생성자와 컬렉션 형식의 단일 인자를 받고 해당 인자의 요소와 동일한 요소를 가지는 새로운 컬렉션을 생성하는 생성자입니다. 사실, 후자의 생성자는 사용자가 모든 컬렉션을 복사하여 원하는 구현 타입과 동등한 컬렉션을 생성할 수 있도록 합니다. 이 컨벤션을 강요하는 방법은 없지만(인터페이스는 생성자를 가질 수 없기 때문에), Java 플랫폼 라이브러리의 모든 범용적인 Collection 구현체들은 이를 준수합니다.

특정 메소드는 선택적으로 지정됩니다. 만약 구현체가 한 특정 메소드를 구현하지 않은 경우, 해당 메소드가 `UnsupportedOperationException`을 발생시키도록 정의해야 합니다. 이런 특정 메소드들은 컬렉션 인터페이스들의 메소드 명세에서 “optional operation”이라 표기되어 있습니다.

일부 컬렉션 구현체들은 그들이 포함할 수 있는 요소들에 제한이 있습니다. 예를 들어, 어떤 구현체들은 `null` 요소를 금지하고, 어떤 구현체는 요소들의 타입에 제한이 있습니다. 부적격한 요소를 넣으려는 시도는 unchecked 예외, 보통 `NullPointerException`이나 `ClassCastException`을 발생시킵니다. 부적격한 요소의 존재를 쿼리하려는 시도는 예외를 발생시키거나 단순히 `false`를 반환합니다. 일부 구현체들은 행위 전에 금지시키거나 일부 구현체는 행위 후에 금지시킵니다. 보다 일반적으로, 부적격한 요소에 대한 작업을 시도하면 해당 작업의 완료로 인해 컬렉션에 자격이 없는 요소가 삽입되지 않을 경우 예외를 발생시키거나 구현에 따라 성공할 수 있습니다. 이러한 예외는 이 인터페이스 명세서에서 “optional"으로 표시됩니다.

동기화 전략은 각 컬렉션에 따라 다릅니다. 구현에서 더 강력한 보장이 제공되지 않는 경우, 다른 스레드에 의해 변형되는 컬렉션에 대한 어떤 메소드의 호출에서 정의되지 않은 동작이 발생할 수 있습니다. 이것은 직접적인 호출, 호출할 수 있는 메소드에게 컬렉션을 전달하는 것, 그리고 컬렉션을 검사하기 위해 존재하는 반복자(iterator)를 사용하는 것을 포함합니다.

Collections Framework 인터페이스의 많은 메소드들은 `equals` 메소드에 의해 정의되어 있습니다. 예를 들어, `contains(Object o)` 메소드의 명세서에는 “이 컬렉션이 `(o==null ? e==null : e.equals(e))`를 만족하는 요소 `e`를 최소 하나를 포함해야 `true`를 반환한다”라고 나와있습니다. 이 명세가 `Collection.contains`를 `null`이 아닌 인자 `o`로 호출할 경우 `o.equals(e)`가 모든 요소 `e`에 대해 호출된다는 것으로 이해되서는 안 됩니다. `equals` 호출이 금지되고 예를 들어, 두 요소의 해시 코드를 먼저 비교하는 등의 방법으로 자유롭게 최적화를 할 수 있습니다. (`Object.hashCode()` 명세는 서로 다른 해시 코드를 가지는 두 객체는 다르다는 것을 보장합니다.) 보다 일반적으로, 여러 Collections Framework 인터페이스의 구현체는 구현자가 적절하다고 판단하는 경우에 기본 Object 메소드의 명시된 동작을 활용할 수 있습니다.

직간접적으로 자기 자신을 포함하는 자기 참조 인스턴스에서 컬렉션을 재귀적으로 순회하는 일부 컬렉션 작업은 예외를 발생시킬 수 있습니다. 여기에는 `clone()`, `equals()`, `hashCode()`, `toString()` 메소드가 포함됩니다. 구현체는 선택적으로 자기 참조를 할 수 있지만, 현재 대부분의 구현체는 그렇지 않습니다.

## View Collections

대부분의 컬렉션들은 자신들이 포함하는 요소들의 저장 공간을 관리합니다. 이와 반대로, view 컬렉션들은 그들 스스로 요소를 관리하지 않고 대신 실제 요소를 저장하기 위해 backing 컬렉션에 의존합니다. view 컬렉션에 의해 관리되지 않는 동작들은 backing 컬렉션에게 위임됩니다. view 컬렉션의 예시로는 `Collections.checkedCollection`, `Collections.synchronizedCollection`, `Collections.unmodifiableCollection` 등의 메소드에 의해 반환되는 wrapper 컬렉션들이 있습니다. 또 다른 예로는 `List.subList`, `NavigableSet.subSet`, `Map.entrySet` 등으로 같은 요소의 다른 표현법을 제공하는 컬렉션이 있습니다. backing 컬렉션에 대한 모든 변경 사항은 view 컬렉션에서도 볼 수 있습니다. 마찬가지로, view 컬렉션에서 (변경이 허용된 경우) 수행된 모든 변경 사항은 backing 컬렉션에 저장됩니다. 비록 Iterator와 ListIterator의 인스턴스가 컬렉션은 아니지만, 그들 역시 backing 컬렉션으로의 변경 사항이 저장되는 것을 허용할 수 있고, 때때로 backing 컬렉션의 변경이 Iterator가 반복하는 동안 보일 수도 있습니다.

## Unmodifiable Collections

이 인터페이스의 특정 메소드들은 “파괴적”으로 간주되고 “mutator(변경자)”라고 불리는 점에서 그들은 그들이 동작하는 컬렉션에 포함된 객체들의 집합을 수정할 수 있습니다. 이 컬렉션 구현체가 동작을 구현하지 않으면 이 메소드들은 `UnsupportedOperationException`을 발생시키도록 명시될 수 있습니다. 이런 메소드들은 (필수는 아니지만) 호출이 컬렉션에 아무 영향을 주지 않은 경우, `UnsupportedOperationException`을 발생시켜야 합니다. 예를 들어, `add` 동작을 지원하지 않는 컬렉션에 대해서 생각해봅시다. 인자로 빈(empty) 컬렉션와 함께 이 컬렉션에서 `addAll` 메소드가 호출되면 어떤 일이 발생할까요? 요소를 추가하지 않는 경우, 영향을 주지 않기 때문에 이 컬렉션은 단순히 아무것도 하지 않고 예외를 발생시키지 않아도 괜찮습니다. 하지만 특정한 경우에만 예외를 발생시키는 것은 프로그래밍 오류를 유발할 수 있기 때문에, 이러한 경우에도 무조건 예외를 던지는 것이 권장됩니다.

unmodifiable 컬렉션들은 모든 변경자(mutator) 메소드이 `UnsupportedOperationException`를 발생시키도록 명시되어 있습니다. 그러므로 이런 컬렉션은 그의 어떤 메소드를 통해서도 변경될 수 없습니다. 컬렉션이 적절하게 변경되지 않게 하기 위해서, 여기서 파생된 모든 view 컬렉션 역시 변경 불가능이어야만 합니다. 예를 들어 List가 변경 불가능하다면, `List.subList`로 반환되는 List 역시 변경 불가능해야 합니다.

unmodifiable 컬렉션들이 꼭 immutable인 것은 아닙니다. 만약 포함된 요소가 mutable하다면, 전체 컬렉션이 unmodifiable일지라도 mutable합니다. (_의미를 분명히 하기 위해 영문 그대로 적었습니다._) 예를 들어, unmodifiable한 리스트 두 개가 mutable한 요소들을 포함한다고 합시다. 비록 두 리스트 모두 unmodifiable하더라도, 요소들이 mutated됨에 따라 `list1.equals(list2)`의 호출 결과가 달라질 수 있습니다. 하지만, 만약 unmodifiable한 컬렉션이 모두 immutable한 요소들을 가진다면, 이는 효과적으로 inmmutable합니다.

## Unmodifiable View Collections

unmodifiable view 컬렉션은 unmodifiable한 동시에 backing 컬렉션의 view입니다. 이들의 변경자(mutator) 메소드들은 `UnsupportedOperationException`을 던지는 반면(위에서 설명했듯), 읽기와 쿼리 메소드들은 backing 컬렉션에게 위임합니다. 이는 backing 컬렉션으로의 읽기 전용(read-only) 접근을 제공합니다. 이것은 구성 요소가 내부 컬렉션에 대한 읽기 액세스를 제공하면서 사용자가 이러한 컬렉션을 예상치 못하게 수정하는 것을 방지하는 데 유용합니다. unmodifiable view 컬렉션의 예로는 `Collections.unmodifiableCollection`, `Collections.unmodifialbeList`, 그리고 관련된 메소드들의 반환값이 있습니다.

backing 컬렉션의 수정은 여전히 가능하고, 만약 발생한다면 그들은 unmodifiable view를 통해 보일 것입니다. 그러므로 unmodifiable view 컬렉션은 꼭 immutable할 필요는 없습니다. 하지만 unmodifiable view의 backing 컬렉션이 사실상 immutable이 불가능하거나 backing 컬렉션에 대한 유일한 참조가 unmodifiable view를 통해서만 이루어진 경우, 해당 view는 사실상 변경 불가능하다고 할 수 있습니다.

## Serializability of Collections

컬렉션의 직렬성(Serializability of Collections)는 선택적입니다. 따라서 어떤 컬렉션 인터페이스도 `java.io.Serializable` 인터페이스를 구현하도록 선언되어 있지 않습니다. 하지만, 직렬성은 일반적으로 사용되는 것으로 간주되고, 따라서 대부분의 컬렉션 구현체들은 직렬적입니다(serializable).

public 클래스인 컬렉션 구현체(`ArrayList`나 `HashMap` 같은)는 실제로 직렬화 가능한 경우, `Serializable` 인터페이스를 구현하도록 선언되어 있습니다. unmodifiable 컬렉션 같은 컬렉션 구현체들은 public 클래스가 아닙니다. 이런 컬렉션의 직렬화는 그들을 생성하는 메소드의 명세나 다른 적절한 위치에 설명되어 있습니다. 컬렉션의 직렬성이 명세되지 않은 경우, 이러한 컬렉션의 직렬성은 보장되지 않습니다. 특히, 많은 view 컬렉션은 직렬적이지 않습니다.

`Serializable` 인터페이스를 구현하는 컬렉션 구현체는 직렬적임이 보장되지 않습니다. 일반적으로, 컬렉션은 다른 타입의 요소를 포함하고, 일부 요소의 인스턴스들이 실제로 직렬적인지 전역적으로 판단하는 것은 불가능하기 때문입니다. 예를 들어, `E`가 `Serializable` 인터페이스를 구현하지 않고, 직렬적인 `Collection<E>`에 대해서 생각해봅시다. `E`의 직렬적인 서브 타입의 요소들만 포함하거나 빈 경우에만 이 컬렉션은 직렬적일 것입니다. 따라서 컬렉션은 조건부로 직렬화 가능하다고 말할 수 있으며, 컬렉션 전체의 직렬화 여부는 컬렉션 자체가 직렬화 가능하고 모든 포함된 요소도 직렬화 가능한지에 따라 달라집니다.

추가적인 경우는 `SortedSet`과 `SortedMap`의 인스턴스에서 발생합니다. 이 컬렉션들은 집합 요소나 맵 키를 정렬하는 `Comparator`에 의해 생성됩니다. 이런 컬렉션은 주어진 Comparator가 직렬화 가능한 경우에만 직렬화가 가능합니다.

## 속성과 메소드

```java
public interface Collection<E> extends Iterable<E> {

    // Query Operations

    int size();
    boolean isEmpty();
    boolean contains(Object o);
    Iterator<E> iterator();
    Object[] toArray();
    <T> T[] toArray(T[] a);
    default <T> T[] toArray(IntFunction<T[]> generator) {
        return toArray(generator.apply(0));
    }

    // Modification Operations

    boolean add(E e);
    boolean remove(Object o);

    // Bulk Operations

    boolean containsAll(Collection<?> c);
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    default boolean removeIf(Predicate<? super E> filter) {
        Objects.requireNonNull(filter);
        boolean removed = false;
        final Iterator<E> each = iterator();
        while (each.hasNext()) {
            if (filter.test(each.next())) {
                each.remove();
                removed = true;
            }
        }
        return removed;
    }
    boolean retainAll(Collection<?> c);
    void clear();

    // Comparison and hashing

    boolean equals(Object o);
    int hashCode();
    @Override
    default Spliterator<E> spliterator() {
        return Spliterators.spliterator(this, 0);
    }
    default Stream<E> stream() {
        return StreamSupport.stream(spliterator(), false);
    }
    default Stream<E> parallelStream() {
        return StreamSupport.stream(spliterator(), true);
    }
}
```

## Query Operations

#### `int size();`

- 이 컬렉션에 있는 요소의 개수를 반환합니다. 만약 이 컬렉션이 `Integer.MAX_VALUE`보다 더 많이 가지고 있다면, `Integer.MAX_VALUE`를 반환합니다.
- Returns: 이 컬렉션에 있는 요소의 개수

#### `boolean isEmpty();`

- 이 컬렉션이 아무런 요소도 가지고 있지 않은 경우, `true`를 반환합니다.
- Returns: 이 컬렉션이 아무런 요소도 가지고 있지 않은 경우, `true`

#### `boolean contains(Object o);`

- 이 컬렉션이 특정 요소를 포함하는 경우, `true`를 반환합니다. 더 자세히로는, `Object.equals(o, e)`인 요소 `e`를 최소 하나 포함하는 경우에만 `true`를 반환합니다. (_iff_)
- Params: `o` - 이 컬렉션에 대해 지정된 요소가 존재하는지 테스트하려는 요소
- Returns: 이 컬렉션이 지정된 요소를 포함하는 경우, `true`
- Throws
  - `ClassCastException` - 이 컬렉션과 지정된 요소의 타입이 맞지 않은 경우
  - `NullPointerException` - 특정 요소가 `null`이고 이 컬렉션이 `null`을 허용하지 않는 경우

#### `Iterator<E> iterator();`

- 이 컬렉션의 요소들을 순회하기 위한 반복자(iterator)를 반환합니다. (이 컬렉션이 요소의 반환 순서를 보장하는 클래스의 인스턴스가 아니라면) 요소가 반환되는 순서에 대한 보장은 없습니다.
- Returns: 이 컬렉션의 요소들을 순회하는 반복자

#### `Object[] toArray();`

- 이 컬렉션의 모든 요소를 포함하는 배열을 반환합니다. 이 컬렉션의 반복자(iterator)가 요소의 반환 순서를 보장한다면, 이 메소드는 반드시 같은 순서로 요소들을 반환해야 합니다. 반환된 배열의 런타임 컴포넌트 타입은 `Object` 입니다.
  반환된 배열은 안전하다는 점에서 이 컬렉션에 의해 유지되는 참조가 없습니다. (다시 말해서, 해당 메소드가 배열의 지원을 받더라도 이 메소드는 새로운 배열을 할당해야 한다.) 그러므로, 호출자(caller)는 반환된 메소드를 자유롭게 수정할 수 있습니다.
- Returns: 이 컬렉션의 모든 요소를 포함하고, 런타임 컴포넌트 타입이 `Object`인 배열
- API Note: 이 메소드는 array-based API와 collection-based API 사이에서 다리 역할을 합니다. 런타임 타입이 `Object[]`인 배열을 반환합니다. 존재하는 배열을 사용하기 위해서는 `toArray(T[])` 사용하고, 배열의 런타임 타입을 다루기 위해서는 `toArray(IntFunction)`을 사용하세요.

#### `<T> T[] toArray(T[] a);`

- 이 컬렉션의 모든 요소를 포함하는 배열을 반환합니다. 반환된 배열의 런타임 타입은 지정된 배열(파라미터)의 런타입 타입과 같습니다. 만약 컬렉션이 지정된 배열에 맞다면, 그 안에 반환됩니다. 그렇지 않다면, 주어진 배열의 런타임 타입과 이 컬렉션의 크기로 새로운 배열이 할당됩니다.
  만약 이 컬렉션이 주어진 배열에 여분의 공간을 가지고 들어간다면 (즉, 배열의 요소 개수가 이 컬렉션보다 많다면), 컬렉션의 끝 바로 다음에 오는 배열 요소는 `null`로 설정됩니다. (이것은 이 컬렉션에 `null` 요소가 포함되어 있지 않다는 것을 호출자가 알고 있는 경우에만 이 컬렉션의 길이를 결정하는 데 유용합니다.)
  이 컬렉션의 반복자(iterator)가 요소의 반환 순서를 보장한다면, 이 메소드는 반드시 같은 순서로 요소들을 반환해야 합니다.
- Params: `a` - 이 컬렉션의 요소들을 저장하기 위한 배열이 충분히 크다면 이 배열을 사용하고, 그렇지 으면 같은 런타임 타입의 새로운 배열이 할당됨
- Returns: 이 컬렉션의 모든 요소를 포함하는 배열
- Throws:
  - `ArrayStoreException` - 이 컬렉션의 어떤 요소의 런타임 타입이 주어진 배열의 런타임 컴포넌트 타입에 할당 가능하지 않은 경우
  - `NullPointerException` - 만약 주어진 배열이 `null`인 경우
- API Note: 이 메소드는 array-based API와 collection-based API 사이에서 다리 역할을 합니다. 이는 특정 환경 하에서 존재하는 배열이 재사용될 수 있게끔 합니다. 런타임 타입이 `Object[]`인 배열을 생성하기 위해서는 `toArray()`를 사용하고, 배열의 런타임 타입을 다루기 위해서는 `toArray(IntFunction)`을 사용하세요.
  문자열만을 포함하는 컬렉션 `x`가 있다고 합시다. 아래에 주어진 코드는 이 컬렉션을 미리 할당된 String 배열에 넣는 데 사용될 수 있습니다.
  `java
String[] y = new String[SIZE];
...
y = x.toArray(y);
`

                컬렉션 `x`가 이미 존재하는 배열 `y`보다 더 많은 요소를 가지는 경우, 새로운 배열이 할당되고 반환되어, 반환된 값은 변수 `y`에 재할당됩니다. `toArray(new Object[0])`은 `toArray()`와 기능적으로 동일하다는 것을 주의하세요.

#### `default <T> T[] toArray(IntFunction<T[]> generator)`

- 구현
  ```java
  default <T> T[] toArray(IntFunction<T[]> generator) {
      return toArray(generator.apply(0));
  }
  ```
- 반환된 배열을 할당하기 위한 주어진 제너레이터(generator) 함수를 사용하여, 이 컬렉션의 모든 요소를 포함하는 배열을 반환합니다.
  이 컬렉션의 반복자(iterator)가 요소의 반환 순서를 보장한다면, 이 메소드는 반드시 같은 순서로 요소들을 반환해야 합니다.
- Params: 제너레이터(generator) - 원하는 타입과 주어진 길이로 새로운 배열을 생성하는 함수
- Throws:
  - `ArrayStoreException` - 이 컬렉션의 어떤 요소의 런타임 타입이 생성된 배열의 런타임 컴포넌트 타입에 할당 가능하지 않은 경우
  - `NullPointerException` - 제너레이터 함수가 `null`인 경우
- API Note: 이 메소드는 array-based API와 collection-based API 사이에서 다리 역할을 합니다. 이는 특정 런타임 타입의 배열 생성을 허용합니다. 런타임 타입이 `Object[]`인 배열을 생성하기 위해서는 `toArray()`를 사용하고, 존재하는 배열을 사용하기 위해서는 `toArray(T[])` 사용하세요.
  문자열만을 포함하는 컬렉션 x가 있다고 합시다. 아래에 주어진 코드는 새로이 할당된 String 배열에 넣는데에 사용될 수 있습니다.
  ```java
  String[] y = x.toArray(String[]::new);
  ```
- Implementation Requirements: 기본 구현은 0과 함께 제너레이터 함수를 부르고 반환된 배열을 `toArray(T[])`에 전달합니다.
- Since: 11

## Modification Operations

#### `boolean add(E e);`

- 이 컬렉션이 주어진 요소를 포함하도록 보장합니다. (선택적인 연산) 호출의 결과로 해당 요청이 변하는 경우, `true`를 반환합니다. (만약, 이 컬렉션이 중복을 허용하지 않고 이미 주어진 요소를 포함하는 경우, `false`를 반환합니다.)
  이 연산을 제공하는 컬렉션들은 이 컬렉션에 어떤 요소들이 추가될지에 대한 제한이 있을 것입니다. 예를 들어, 어떤 컬렉션들은 `null` 요소를 추가하는 것을 거절할 것이고, 다른 컬렉션들은 추가될 요소들의 타입에 제한을 둘 것입니다.
  컬렉션이 이미 해당 요소를 포함하고 있다는 이유 외에 어떤 다른 이유로 특정 요소를 추가하지 않는 경우, 반드시 Exception을 발생시켜야 합니다. (`false`를 반환하는 것 대신에) 이는 컬렉션이 항상 이 호출 이후에 특정 요소를 포함한다는 불변을 유지합니다.
- Params: `e` - 이 컬렉션 안에 존재함이 보장된 요소
- Returns: 이 요청으로 컬렉션이 변경될 때 `true`
- Throws:
  - `UnsupportedOperationException` - 이 컬렉션이 add 연산을 지원하지 않는 경우
  - `ClassCastException` - 주어진 요소의 클래스가 이 컬렉션에 추가됨을 막는 경우
  - `NullPointerException` - 주어진 요소가 `null`이고 이 컬렉션이 `null` 요소를 허용하지 않는 경우
  - `IllegalArgumentException` - 요소의 어떤 속성이 이 컬렉션에 추가됨을 막는 경우
  - `IllegalStateException` - 삽입 제한으로 요소가 이번에 추가될 수 없는 경우

#### `boolean remove(Object o);`

- 만약 주어진 요소가 존재한다면, 이 컬렉션에서 인스턴스 하나를 제거합니다. (선택적인 연산) 더 형식적으로, `Objects.equals(o, e)`를 만족하는 `e`가 이 컬렉션에 하나 이상 포함하는 경우, 이러한 요소 하나를 제거합니다. 만약 이 컬렉션이 주어진 요소를 포함하는 경우, `true`를 반환합니다. (또는 같은 의미로, 이 호출로 이 컬렉션이 변경된 경우)
- Params: o - 만약 존재한다면 이 컬렉션에서 제거될 요소
- Returns: 이 호출로 요소가 제거된 경우 `true`
- Throws:
  - `ClassCastException` - 주어진 요소의 타입이 이 컬렉션과 맞지 않는 경우
  - `NullPointerException` - 주어진 요소가 `null`이고 이 컬렉션이 `null` 요소를 허용하지 않는 경우
  - `UnsupportedOperationException` - 이 컬렉션에서 이 요청을 지원하지 않는 경우

## Bulk Operations

#### `boolean containsAll(Collection<?> c);`

- 주어진 컬렉션의 모든 요소들을 이 컬렉션이 포함한다면 `true`를 반환합니다.
- Params: `c` - 이 컬렉션 안에 포함 여부를 확인할 컬렉션
- Returns: 주어진 컬렉션의 모든 요소들이 이 컬렉션이 포함하는 경우 `true`
- Throws:
  - `ClassCastException` - 주어진 컬렉션에서 하나 이상의 요소 타입이 이 컬렉션과 맞지 않는 경우
  - `NullPointerException` - 주어진 컬렉션이 하나 이상의 `null` 요소를 가지고 이 컬렉션이 `null` 요소를 허용하지 않는 경우, 혹은 주어진 컬렉션이 `null`인 경우

#### `boolean addAll(Collection<? extends E> c);`

- 주어진 컬렉션의 모든 요소들을 이 컬렉션에 추가합니다. (선택적인 연산) 연산이 진행되는 동안 주어진 컬렉션이 변경될 때의 이 연산의 행동이 정의되지 않았습니다. (이는 주어진 컬렉션이 이 컬렉션이고 이 컬렉션이 비지 않은 경우, 이 요청의 행위가 정의되지 않음을 뜻합니다.)
- Params: `c` - 이 컬렉션에 추가될 요소들을 가지고 있는 컬렉션
- Returns: 이 호출로 이 컬렉션이 변경되면 `true`
- Throws:
  - `UnsupporedOperationException` - 이 컬렉션에서 addAll 메소드가 지원되지 않는 경우
  - `ClassCastException` - 주어진 컬렉션의 요소의 클래스가 이 컬렉션에 추가되는 것을 막는 경우
  - `NullPointerException` - 주어진 컬렉션이 하나 이상의 `null` 요소를 가지고 이 컬렉션이 `null` 요소를 허용하지 않는 경우, 혹은 주어진 컬렉션이 `null`인 경우
  - `IllegalArgumentException` - 주어진 컬렉션의 요소의 프로퍼티가 이 컬렉션에 추가되는 것을 막는 경우
  - `IllegalStateException` - 삽입 제한으로 현재 모든 요소들이 추가될 수 없는 경우

#### `boolean removeAll(Collection<?> c);`

- 이 컬렉션의 요소 중 주어진 컬렉션에도 포함되어 있는 요소들을 제거합니다. (선택적인 연산) 이 호출이 반환된 이후, 이 컬렉션은 주어진 컬렉션과 공통된 요소를 포함하지 않습니다.
- Params: `c` - 이 컬렉션에서 제거될 요소들을 포함하는 컬렉션
- Throws:
  - `UnsupportedOperationException` - 이 컬렉션에서 `removeAll` 메소드가 지원되지 않는 경우
  - `ClassCastException` - 이 컬렉션에서 하나 이상의 요소 타입이 컬렉션 컬렉션과 맞지 않는 경우
  - `NullPointerException` - 주어진 컬렉션이 하나 이상의 `null` 요소를 가지고 이 컬렉션이 `null` 요소를 허용하지 않는 경우, 혹은 주어진 컬렉션이 `null`인 경우

#### `default boolean removeIf(Predicate<? super E> filter)`

- 구현
  ```java
  default boolean removeIf(Predicate<? super E> filter) {
      Objects.requireNonNull(filter);
      boolean removed = false;
      final Iterator<E> each = iterator();
      while (each.hasNext()) {
          if (filter.test(each.next())) {
              each.remove();
              removed = true;
          }
      }
      return removed;
  }
  ```
- 주어진 조건을 만족하는 이 컬렉션의 모든 요소를 제거합니다. 반복 중에 발생한 오류나 예외 또는 조건(predicate)에서 발생한 예외는 호출자(caller)에게 전달됩니다.
- Params: filter - 제거될 요소들이 `true`를 반환하는 조건
- Returns: 어떤 요소가 제거되면 `true`
- Throws:
  - `NullPointerException` - 주어진 filter가 null인 경우
  - `UnsupportedOperationException` - 이 컬렉션에서 요소들이 제거될 수 없는 경우. 조건에 부합하는 요소가 제거될 수 없거나, 일반적으로 제거가 지원되지 않는 경우 구현체는 이 예외를 발생시킵니다.
- Implementation Requirements: 기본 구현은 컬렉션의 반복자를 사용해서 컬렉션의 모든 요소를 순회합니다. 조건에 부합하는 요소는 `Iterator.remove()`를 이용하여 제거됩니다. 만약 컬렉션의 반복자가 제거를 지원하지 않는 경우, 조건에 부합하는 첫 번째 요소에서 `UnsupportedOperationException`을 발생시킵니다.
- Since: 1.8

#### `boolean retainAll(Collection<?> c);`

- 주어진 컬렉션에 포함된 요소만 이 컬렉션에 유지합니다. (선택적인 연산) 다시 말해, 주어진 컬렉션에 포함되지 않는 모든 요소들은 이 컬렉션에서 제거합니다.
- Params: `c` - 이 컬렉션에서 유지할 요소들을 포함하는 컬렉션
- Throws:
  - `UnsupportedOperationException` - 이 컬렉션에서 `retainAll` 메소드를 지원하지 않는 경우
  - `ClassCastException` - 이 컬렉션에서 하나 이상의 요소 타입이 컬렉션 컬렉션과 맞지 않는 경우
  - `NullPointerException` - 주어진 컬렉션이 하나 이상의 `null` 요소를 가지고 이 컬렉션이 `null` 요소를 허용하지 않는 경우, 혹은 주어진 컬렉션이 `null`인 경우

#### `void clear();`

- 이 컬렉션에서 모든 요소들을 제거합니다. (선택적인 연산) 이 호출이 반환된 이후, 컬렉션은 비게 됩니다.
- Throws:
  - `UnsupportedOperationException` - 이 컬렉션에서 `clear` 메소드를 지원하지 않는 경우

## Comparison and hashing

#### `boolean equals(Object o);`

- 이 컬렉션과 주어진 객체의 동등성을 비교합니다.
  Collection 인터페이스는 `Object.equals`에 대한 일반 계약에 대한 규정을 추가하지 않지만, Collection 인터페이스를 직접 구현하는 프로그래머(다시 말해, Set 또는 List가 아닌 Collection 인터페이스를 구현하는 클래스를 만드는 경우)는 `Object.equals`를 재정의하기로 했다면 주의를 기울여야 합니다. 이렇게 할 필요는 없으며, 가장 간단한 방법은 `Object`의 구현을 사용하는 것입니다. 그러나 구현하는 사람은 기본 "참조 비교" 대신 "값 비교"를 구현하기를 원할 수 있습니다. (List와 Set 인터페이스는 이러한 값 비교를 강제합니다.)
  `Object.equals` 메소드의 일반 명세는 `equals`가 대칭적이어야 한다고 명시합니다. (다시 말해, `a.equals(b)`이면 `b.equals(a)`여야 합니다(_iff_)) `List.equals`와 `Set.equals`의 명세에서는 리스트은 다른 목록과만 동일하고, 집합은 다른 집합과만 동일하다고 명시합니다. 따라서 List 또는 Set 인터페이스를 구현하지 않는 컬렉션 클래스에 대한 사용자 정의 `equals` 메소드는 이 컬렉션이 어떤 목록 또는 집합과 비교될 때 항상 `false`를 반환해야 합니다. (같은 논리에 따라, Set과 List 인터페이스를 동시에 올바르게 구현하는 클래스를 작성하는 것은 불가능합니다.)
- Params: `o` - 이 컬렉션과 동등성이 비교될 객체
- Returns: 해당 객체와 주어진 객체가 같은 경우 `true`

#### `int hashCode();`

- 이 컬렉션의 해시 코드 값을 반환합니다. Collection 인터페이스는 `Object.hashCode` 메소드의 일반 명세에 대한 규정을 추가하지 않지만, 프로그래머는 `Object.equals` 메소드를 재정의하는 모든 클래스는 `Object.hashCode` 메소드도 재정의해야 하며 `Object.hashCode` 메소드의 일반 명세를 만족시키기 위해 `c1.equals(c2)`이라면 `c1.hashCode() == c2.hashCode()`임을 고려해야 합니다.
- Returns: 이 컬렉션의 해시 코드 값

#### `default Spliterator<E> spliterator()`

- 구현
  ```java
  @Override
  default Spliterator<E> spliterator() {
      return Spliterators.spliterator(this, 0);
  }
  ```
- 이 컬렉션의 요소들을 순회하는 `Spliterator`를 생성합니다. 구현체는 Spliterator에 의해 보고된 특정 값들을 문서화해야 합니다. Spliterator가 `Spliterator.SIZED`를 보고하고 이 컬렉션이 아무런 요소를 포함하지 않는 경우, 이런 특정 값들은 보고될 필요가 없습니다.
  더 효율적인 Spliterator를 반환할 수 있는 하위 클래스에서는 기본 구현을 재정의(override)해야 합니다. `stream()`과 `parallelStream()` 메소드의 예상된 지연 동작(expected laziness behavior)을 유지하기 위해서 Spliterator는 `IMMUTABLE` 또는 `CONCURRENT` 특성을 가지거나, 늦은 바인딩(late-binding)이어야 합니다. 이 방법들이 불가능한 경우, 재정의된 클래스는 Spliterator의 바인딩과 구조적인 간섭의 문서화된 정책을 설명하고, `stream()` 및 `parallelStream()` 메소드를 재정의하여 Spliterator의 `Supplier`를 사용하는 스트림을 아래와 같이 생성해야 합니다.

  ```java
    Stream<E> s = StreamSupport.stream(() -> spliterator(), spliteratorCharacteristics)
  ```

  이러한 요구 사항은 `stream()` 및 `parallelStream()` 메소드에 의해 생성된 스트림이 최종 스트림 작업의 시작 시점에 컬렉션의 내용을 반영하도록 보장합니다.

- Returns: 이 컬렉션을 순회하는 `Spliterator`
- Implementation Requirements: 기본 구현체는 이 컬렉션의 반복자에서 late-binding Spliterator를 생성합니다. Spliterator는 컬렉션의 iterator의 _fail-fast_ 속성을 상속합니다.
  생성된 Spliterator는 `Spliterator.SIZED`를 보고합니다.
- Implementation Note: 생성된 Spliterator는 추가적으로 `Spliterator.SUBSIZED`를 보고합니다. Spliterator가 어떤 요소도 포함하지 않는 경우에는 `SIZED` 및 `SUBSIZED`를 포함한 추가적인 특정 값의 보고가 클라이언트가 계산을 제어, 특화 또는 단순화하는 데 도움이 되지 않습니다. 그러나 이것은 빈 컬렉션의 경우 불변(immutable)하고 빈 Spliterator 인스턴스(`Spliterators.emptySpliterator()` 참조)의 공유 사용을 가능하게 하고, 클라이언트가 그러한 Spliterator가 어떤 요소도 포함하지 않는지 여부를 결정할 수 있도록 합니다.
- Since: 1.8

#### `default Stream<E> stream()`

- 구현
  ```java
  default Stream<E> stream() {
      return StreamSupport.stream(spliterator(), false);
  }
  ```
- 이 컬렉션을 소스로 하는 연속적인 스트림을 반환합니다.
  이 메소드는 `spliterator()` 메소드가 `IMMUTABLE`, `CONCURRENT`이거나 late-binding인 Spliterator를 반환할 수 없는 경우 재정의(override)되어야 합니다. (`spliterator()` 참조)
- Returns: 이 컬렉션의 요소들을 순회하는 연속적인 Stream
- Implementation Requirements: 기본 구현체는 이 컬렉션의 `Spliterator`에서 연속적인 Stream을 생성합니다.
- Since: 1.8

#### `default Stream<E> parallelStream()`

- 구현
  ```java
  default Stream<E> parallelStream() {
      return StreamSupport.stream(spliterator(), true);
  }
  ```
- 이 컬렉션을 소스로 하는 가능한 병렬 스트림을 반환합니다. 이 메소드가 연속적인 스트림을 반환하는 것이 허용됩니다.
  이 메소드는 `spliterator()` 메소드가 `IMMUTABLE`, `CONCURRENT`이거나 late-binding인 Spliterator를 반환할 수 없는 경우 재정의(override)되어야 합니다. (`spliterator()` 참조)
- Returns: 이 컬렉션의 요소들을 순회하는 가능한 병렬 스트림
- Implementation Requirements: 기본 구현체는 이 컬렉션의 `Spliterator`에서 병렬 스트림을 생성합니다.
- Since: 1.8

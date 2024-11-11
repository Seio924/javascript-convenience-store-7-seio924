# javascript-convenience-store-precourse

# 🏪 편의점 저장소 기능 구현 목록

## 사용자 입력

- [x] 구매할 상품과 수량을 입력 받는다. (상품명, 수량은 하이픈(-)으로, 개별 상품은 대괄호([])로 묶어 쉼표(,)로 구분한다.)
  - ❌ 예외 처리
    - [ ] 구매할 상품과 수량 형식이 올바르지 않은 경우: [ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.
    - [ ] 존재하지 않는 상품을 입력한 경우: [ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.
    - [x] 구매 수량이 재고 수량을 초과한 경우: [ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.
    - [ ] 기타 잘못된 입력의 경우: [ERROR] 잘못된 입력입니다. 다시 입력해 주세요.

```
구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
```

- [x] 프로모션 상품에 대한 추가 여부를 입력받는다. (Y/N)
  - ❌ 예외 처리
    - [ ] 입력이 Y나 N이 아닌 경우: [ERROR] 잘못된 입력입니다. Y 또는 N을 입력해 주세요.

```
현재 오렌지주스은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
```

- [x] 일부 수량에 대해 정가로 결제할지 여부를 입력받는다. (Y/N)
  - ❌ 예외 처리
    - [ ] 입력이 Y나 N이 아닌 경우: [ERROR] 잘못된 입력입니다. Y 또는 N을 입력해 주세요.

```
현재 콜라 4개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
```

- [x] 멤버십 할인 적용 여부를 입력 받는다. (Y/N)
  - ❌ 예외 처리
    - [ ] 입력이 Y나 N이 아닌 경우: [ERROR] 잘못된 입력입니다. Y 또는 N을 입력해 주세요.

```
멤버십 할인을 받으시겠습니까? (Y/N)
```

- [ ] 추가 구매 여부를 입력 받는다. (Y/N)
  - ❌ 예외 처리
    - [ ] 입력이 Y나 N이 아닌 경우: [ERROR] 잘못된 입력입니다. Y 또는 N을 입력해 주세요.

```
감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
```

## 주문서 생성

- [x] 사용자가 입력한 구매할 상품과 수량으로 주문서를 생성한다.

## 재고 관리

- [x] 물품 저장소에 물품 목록에 맞게 재고를 채워넣는다.
- [x] 구매 수량과 각 상품의 재고 수량을 고려하여 재료 부족 여부를 확인한다.
- [ ] 고객이 상품을 구매할 때마다, 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다.

## 프로모션 할인

- [x] 프로모션 조건을 설정한다. (N개 구매 시 1개 무료 증정)

- [x] 오늘 날짜가 프로모션 기간 내에 포함된 경우에만 할인을 적용한다.
- [x] 프로모션 재고가 없을 경우 할인을 적용하지 않는다.
- [x] 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 구입했는지에 대한 여부를 판단한다.
- [x] 무료 증정 수량을 계산한다.

## 멤버십 할인

- [ ] 멤버십 회원은 프로모션 미적용 금액의 30%를 할인받는다.
- [ ] 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
- [ ] 멤버십 할인의 최대 한도는 8,000원이다.

## 편의점 정보 출력

- [x] 편의점 소개와 재고 현황을 출력한다.

출력 예시

```
안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 5개
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개
```

## 영수증 출력

- [ ] 구매 상품 내역을 출력한다. (구매한 상품명, 수량, 가격)
- [ ] 증정 상품 내역을 출력한다. (프로모션에 따라 무료로 제공된 증정 상품의 목록)
- [ ] 금액 정보를 출력한다.
  - 총구매액: 구매한 상품의 총 수량과 총 금액
  - 행사할인: 프로모션에 의해 할인된 금액
  - 멤버십할인: 멤버십에 의해 추가로 할인된 금액
  - 내실돈: 최종 결제 금액

출력 예시

```
===========W 편의점=============
상품명		수량	금액
콜라		3 	3,000
에너지바 		5 	10,000
===========증	정=============
콜라		1
==============================
총구매액		8	13,000
행사할인			-1,000
멤버십할인			-3,000
내실돈			 9,000
```

# 프로모션 조건에 따른 입력 처리

- 사용자가 구매할 상품 수량이 buy로 나누어 떨어질 경우 (예: 구매 상품 수량이 4개일 때), 다음 중 선택:

  - 처음부터 buy로 나누어 판단하여 프로모션 상품(예: 2개)에 대한 추가 여부를 입력받는다.
  - 프로모션을 적용한 후 (예: 2+1이므로 3개로 나눈 후), 나머지 수량에 대해 다시 buy로 나누어 판단하여 추가 여부를 입력받는다. -> ✅ 선택

- 사용자가 구매할 상품 수량 4개이고 2(buy)+1(get) 프로모션에 해당할 경우
  - 구매 수량을 3(buy + get)으로 나누어 나머지를 계산한다.
  - 나머지가 2(buy)이므로, 프로모션 상품에 대한 추가 여부를 입력받는다.
- 그 외의 경우는 입력 받지않는다.

# 🏪 편의점 저장소 실행 결과

```
안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 5개
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-3],[에너지바-5]

멤버십 할인을 받으시겠습니까? (Y/N)
Y

===========W 편의점=============
상품명		수량	금액
콜라		3 	3,000
에너지바 		5 	10,000
===========증	정=============
콜라		1
==============================
총구매액		8	13,000
행사할인			-1,000
멤버십할인			-3,000
내실돈			 9,000

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
Y

안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 7개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 재고 없음
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-10]

현재 콜라 4개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
Y

멤버십 할인을 받으시겠습니까? (Y/N)
N

===========W 편의점=============
상품명		수량	금액
콜라		10 	10,000
===========증	정=============
콜라		2
==============================
총구매액		10	10,000
행사할인			-2,000
멤버십할인			-0
내실돈			 8,000

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
Y

안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 재고 없음 탄산2+1
- 콜라 1,000원 7개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 재고 없음
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[오렌지주스-1]

현재 오렌지주스은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
Y

멤버십 할인을 받으시겠습니까? (Y/N)
Y

===========W 편의점=============
상품명		수량	금액
오렌지주스		2 	3,600
===========증	정=============
오렌지주스		1
==============================
총구매액		2	3,600
행사할인			-1,800
멤버십할인			-0
내실돈			 1,800

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
N
```

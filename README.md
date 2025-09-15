# 🕵️ 化学研究室謎解き事件

## 📋 ゲームルール

### 基本ルール

- あなたたちは優秀な探偵チームです
- 化学研究室にある PC の中に重要な証拠があるとの噂を聞き、調査にやって来ました
- GitHub リポジトリとウェブサイトを駆使して事件の真相を解明することが目標です

### 注意事項

- **パスワード収集**: 最初にログインに必要なパスワードを探して集めてください
- **ヒント機能**: 困った時はヒントボタンを活用しましょう（一部のページに存在）
- **推奨ブラウザ**: Chrome での表示を推奨しています
- **Cookie 設定**: このサイトでは Cookie を使用するため、必ず許可してください
- **ブラウザバック禁止**: 進行に影響が出る恐れがあるため、ブラウザの戻るボタンは使用しないでください
- **制限時間**: 30 分
- **AI 使用禁止**: 解答やヒント取得に AI ツールは使用しないでください
- **インターネット検索可**: 一般的な情報収集のためのインターネット検索は許可します

## 🧪 あらすじ

夕方の薄暗い大学構内。化学研究室の窓からは、オレンジ色に染まった夕日の光が差し込んでいました。

しかし、その美しい夕景とは裏腹に、この研究室では不可解な事件が発生していたのです。研究室の貴重な実験データが何者かによって盗まれ、さらに研究員の一人が忽然と姿を消してしまいました。

現場に残されたのは、夕日と同じオレンジ色に染まった PC 画面だけ。この PC には何らかの手がかりが残されているかもしれません。

警察の初動捜査では手がかりを掴めず、事件は迷宮入りの様相を呈していました。しかし、関係者の証言により、行方不明になった研究員がこの PC に重要なデータを隠していた可能性が浮上したのです。

夕暮れに包まれた静寂な研究室で、果たして真相を解き明かすことができるのでしょうか。

## 🔑 パスワードのヒント

問題 1

次の employees テーブルがあります。

| id  | name   | department | salary |
| --- | ------ | ---------- | ------ |
| 1   | Tanaka | Sales      | 300000 |
| 2   | Suzuki | IT         | 400000 |
| 3   | Yamada | Sales      | 350000 |
| 4   | Sato   | HR         | 280000 |

「Sales 部署の従業員名を給与（salary）の昇順で取得する」SQL はどれか？

1. ```sql
   SELECT name FROM employees WHERE department = 'Sales' ORDER BY name ASC;
   ```
2. ```sql
   SELECT * FROM employees ORDER BY department = 'Sales';
   ```
3. ```sql
   SELECT name FROM employees WHERE department = 'Sales' ORDER BY salary ASC;
   ```
4. ```sql
   SELECT name FROM employees WHERE department LIKE '%Sales%' GROUP BY salary;
   ```

問題 2

orders テーブルには以下のデータがあります。

| id  | customer_id | amount |
| --- | ----------- | ------ |
| 1   | C001        | 1000   |
| 2   | C002        | 2000   |
| 3   | C001        | 1500   |
| 4   | C003        | 3000   |

「顧客ごとの合計購入額」を求める SQL はどれか？

1. ```sql
   SELECT customer_id, COUNT(amount) FROM orders GROUP BY customer_id;
   ```
2. ```sql
   SELECT customer_id, amount FROM orders GROUP BY customer_id;
   ```
3. ```sql
   SELECT customer_id, SUM(amount) FROM orders;
   ```
4. ```sql
   SELECT customer_id, SUM(amount) FROM orders GROUP BY customer_id;
   ```

問題 3

students と courses テーブルがあります。

students

| id  | name | course_id |
| --- | ---- | --------- |
| 1   | Aki  | 101       |
| 2   | Hiro | 102       |
| 3   | Miki | 101       |

courses

| id  | course_name |
| --- | ----------- |
| 101 | Math        |
| 102 | English     |

「各学生の名前とコース名を取得する」SQL はどれか？

1. ```sql
   SELECT s.name, c.course_name
   FROM students s
   JOIN courses c ON s.id = c.id;
   ```
2. ```sql
   SELECT s.name, c.course_name
   FROM students s
   JOIN courses c ON s.course_id = c.id;
   ```
3. ```sql
   SELECT name, course_name
   FROM students, courses;
   ```
4. ```sql
   SELECT name, course_name
   FROM students NATURAL JOIN courses;
   ```

問題 4

次の employees テーブルがあります。
employees テーブルから「全社員の平均給与以上の給与をもつ従業員の名前」を取得したい。正しい SQL はどれか？

| id  | name   | department | salary |
| --- | ------ | ---------- | ------ |
| 1   | Tanaka | Sales      | 300000 |
| 2   | Suzuki | IT         | 400000 |
| 3   | Yamada | Sales      | 350000 |
| 4   | Sato   | HR         | 280000 |

1. ```sql
   SELECT name FROM employees WHERE salary > AVG(salary);
   ```
2. ```sql
   SELECT name FROM employees GROUP BY name HAVING salary >= AVG(salary);
   ```
3. ```sql
   SELECT name FROM employees WHERE salary = (SELECT salary FROM employees GROUP BY salary);
   ```
4. ```sql
   SELECT name FROM employees WHERE salary >= (SELECT AVG(salary) FROM employees);
   ```

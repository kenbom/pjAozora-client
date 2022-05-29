# らくらく！青色申告（ベータ版ですが）

## これは何
- フリーランサーの皆さんが青色申告をできるだけラクに自力で済ませるためのWebアプリです。
- まだベータ版ですが入力の簡単さを体験いただくために[一部公開](https://pj-aozora-client-n0ca7drrn-kenbom.vercel.app/)を始めました。
- メアド：　soso@uso.com　　パスワード：　password　で使ってみてください。
- お試し版です。くれぐれもお仕事の数字など入れないでくださいね。
- 一覧表示を優先したかったためスマホ表示へのレイアウト対応は行っていません。PCかタブレットをおすすめします。

## なぜラクに使えるのか
- 青色申告の悩みは面倒な決算書類の作成です。普通に作ると手強い会計仕訳の知識が必要となります。
- 税務申告で個人事業主（＝フリーランサー）にだけ認められる「事業主勘定」の活用がこのアプリのウリです。
- 「事業主勘定」を使うと決算書作成がまるでこづかい帳のように収入と支出の記帳だけでほぼ完了します。
- アプリではこの会計手法をさらに簡便にし、収入か支出の科目を選択し金額を入力するだけで仕訳が完了します。
- 「らくらく！青色申告」を使えば、もう「貸方、借方？」「反対勘定？」なんかに悩む必要はありません。


## 利用させていただいたフレームワーク、ライブラリなど
- バックエンド: Apollo server, Prisma, PostgreSQL ほか
- フロントエンド: React,Nextjs, React-query, Graphql-request, Chakra-UI ほか
- ホスティング: Vercel (Nextjs), Heroku (Apollo server, PostgreSQL)
- 個人開発を決めた時点で：
  - 出来る限り（いわゆる）モダンなWeb開発技術を使いたい。
  - とはいえ費用発生はできるだけ抑えたい。
  - ということで上記の選択となりました。

## 今後の実装の課題
- ベータ版ということで申し訳ありません、損益計算書と貸借対照表がこれからです。
- これらは日々の仕訳の集計という重い処理なのでバックエンドでの実装になります。
- BEFFEという役割のApollo serverではいささか荷が重く、Nestjsの採用を考えています。
- あと認証が現在の実装では素朴すぎて正式公開にはちょっと無理、でしょう。
- ちなみに現時点ではJWTをApolloで発行、localstorageにしまっています。
- ここはAuth0か、NextAuthを候補として思案中です。

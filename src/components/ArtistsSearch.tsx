import React, { memo } from "react";
import { useState, VFC } from "react";
import styled from "styled-components";

import { useSerchArtists } from "../hooks/useSearchArtists";

type Props = {
  accessToken: string;
};

export const ArtistsSearch: VFC<Props> = memo((props) => {
  const { accessToken } = props;
  const {
    searchArtists,
    resultArtistDatas,
    loading,
    error
  } = useSerchArtists();
  const [searchArtistName, setSearchArtistName] = useState("");

  const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchArtistName(e.target.value);
  };

  // 検索実行
  const onClickSearchArtist = () => {
    searchArtists(searchArtistName, accessToken);
  };

  return (
    <>
      <input
        value={searchArtistName}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="アーティスト名を入力"
      />
      <button onClick={onClickSearchArtist} type="submit">
        検索
      </button>
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {resultArtistDatas.map((artist) => (
            <SDl key={artist.id}>
              <img
                height={160}
                width={160}
                src={artist.img[1]?.url || ""}
                alt={artist.name}
              />
              <dd>{artist.name}</dd>

              <dt>ポピュラリティ</dt>
              <dd>{artist.popularity}</dd>
              <dt>ジャンル</dt>
              <dd>{artist?.genres}</dd>
            </SDl>
          ))}
        </>
      )}
    </>
  );
});

const SDl = styled.dl<any>`
  text-align: left;
  margin-bottom: 0;
  dt {
    float: left;
  }
  dd {
    padding-left: 32px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
  }
`;
import React, {useEffect, useState} from 'react';
import s from '../styles/tutorial.module.scss';
import {useAppContext} from './AppContext';
import {useNox} from '../hooks/useNox';
import {TutorialFlowData} from './TutorialFlow';
import trophy from '../static/images/trophy_solana.png';

export const DonePage = ({data}: {data: TutorialFlowData}) => {
  const {sessionId} = useAppContext();
  const nox = useNox(sessionId);
  const {tutorial} = data;
  const [setCompletedNFTs, setSetCompletedNFTs] = useState(undefined as undefined | number);

  useEffect(() => {
    // useful to comment out in dev
    nox.complete(true).then((data) => {
      const count = data.spaces_nft_reward_count;
      setSetCompletedNFTs(count);
    });
  }, []);

  return (
    <div className={s.outer_end_container}>
      <div className={s.bg_done} />
      <div className={s.close_bar}>
        <p>
          Close the brower to exit the tutorial. <span className={s.close_arrow} />
        </p>
      </div>
      <div className={s.text}>
        <h1 className={s.congrats}>Nice job!</h1>
        {data.previouslyRewarded ? (
          <p className={s.done_body}>We previously airdropped you this NFT:</p>
        ) : tutorial.on_complete_nft?.image ? (
          <p className={s.done_body}>You’ve earned your reward:</p>
        ) : (
          <p className={s.done_body}>You successfully completed the tutorial.</p>
        )}
        <p className={s.logo}>
          <img className={s.top_logo} src={tutorial.logo} />
        </p>
        <p className={s.partner_name_done}>
          {tutorial.name} {tutorial.on_complete_nft?.image && 'NFT'}
        </p>
        <div className={s.nft_block}>
          {tutorial.on_complete_nft?.image ? (
            <div>
              {/* <pre style={{fontSize: '12px', marginBottom: '10px'}}>{tutorial.on_complete_nft.id}</pre> */}
              <img style={{display: 'block', maxWidth: '75%', margin: '0 auto'}} src={tutorial.on_complete_nft.image} />
              <p className={s.lookout}>Be on the look out for the NFT in your Phantom wallet.</p>
            </div>
          ) : (
            <img style={{display: 'block', maxWidth: '55%', margin: '25px auto 0'}} src={trophy} />
          )}
        </div>
        <p className={s.more_tuts} style={{marginBottom: '8px'}}>
          We encourage you to explore additional partner tutorials to unlock more rewards.
        </p>
        <p className={s.more_tuts}>
          Complete {tutorial.store?.misc['tuts_needed']} partner tutorials and earn {tutorial.store?.misc['usdc_value']}{' '}
          USDC. To redeem, show a Solana Ambassador {tutorial.store?.misc['tuts_needed']} Solana Spaces Partner NFTs.
          <br />
          {!!setCompletedNFTs && setCompletedNFTs > 0 && (
            <span style={{color: '#9945ff'}}>
              You currently have {Math.min(setCompletedNFTs, parseInt(tutorial.store?.misc['tuts_needed']))} of{' '}
              {tutorial.store?.misc['tuts_needed']}!
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

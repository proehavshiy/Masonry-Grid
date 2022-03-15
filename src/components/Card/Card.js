import React from "react";
import dummy from '../../images/dummy.png'

function Card(props) {
  const { image, author, heading, description, link, firstCardSizeMode = 'regular', onLoad } = props;

  const [imgLink, setImgLink] = React.useState(image);

  // картинка-заглушка при ошибке загрузки
  const handleLoading = (res) => {
    if (res.type === 'error') {
      setImgLink(dummy)
    }
    onLoad()
  };

  return (
    <a className={`cardLinkWrapper ${firstCardSizeMode}`} href={link}>
      <li className='card'>
        <div className='container'>
          <img className='img'
            src={imgLink}
            onLoad={handleLoading}
            onError={handleLoading}
            alt={`изображение статьи: ${heading}`}
          />
        </div>
        <div className='content'>
          <p className='author'>{author}</p>
          <h6 className='heading'>{heading}</h6>
          <p className='description'>{description}</p>
        </div>
      </li>
    </a>
  );
}

export default Card
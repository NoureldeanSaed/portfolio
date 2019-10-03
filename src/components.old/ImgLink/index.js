import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

const ImgLink = ({ href, src, className, ...rest }) => (
	<a
		target='_blank'
		rel='noopener noreferrer'
		href={href}
		className={classNames('img-link', className)}
		{...rest}
	>
		<img src={src} />
	</a>
);

ImgLink.propTypes = {
	href: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	className: PropTypes.string
};

ImgLink.defaultProps = { className: false };

export default ImgLink;

import React, {
	Component
} from 'react';
import PropTypes from 'prop-types'
import './style/side-nav.less'
import { Link } from 'react-router-dom'

class SideNav extends Component {

	static propTypes = {
		
	}

	static defaultProps = {
		menuItems: [
			{
				title: '首页啦',
				subItems: [],
				toPath: '/'
			},
			{
				title: '测试页面',
				subItems: [],
				toPath: '/test'
			},
		]
	}

	render() {
		const { menuItems} = this.props
		return (
			<ul className="ums-comp-sidenav" >
				{menuItems.map((item, index) =>
						<li className="item">
							<Link to={item.toPath} key={item.toPath}>{item.title}</Link>
						</li>	
					)}
			</ul>)
	}
}

export default SideNav;

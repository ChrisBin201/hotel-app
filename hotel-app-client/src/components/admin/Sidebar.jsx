import { NavLink } from 'react-router-dom'
const itemsCore = [
  {
    name: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    name: 'Room',
    link: '/admin/room',
  },
  {
    name: 'Service',
    link: '/admin/service',
  },
  {
    name: 'Customer',
    link: '/admin/customer',
  },
  {
    name: 'Client Statistic',
    link: '/admin/statClient',
  },
  {
    name: 'Room Statistic',
    link: '/admin/statRoom',
  },
]

const SidebarNavLink = ({ item }) => {
  const className = `
    block px-4 py-3 pl-12 mb-1
    rounded-xl font-semibold
    text-gray-600
    hover:text-gray-900
    hover:bg-primary-50
    transition
  `

  const activeClassName = `text-primary-500 hover:text-primary-500 bg-primary-50`

  return (
    <div className=' flex-1 overflow-y-auto' >
      {item.link && !item.link.includes('http') && (
        <NavLink
          to={item.link}
          // exact={item.link === '/'}
          className={className}
          activeclassname={activeClassName}
        >
          {item.name}
        </NavLink>
      )}
      {item.link && item.link.includes('http') && (
        <a href={item.link} className={className}>
          {item.name}
        </a>
      )}
      {!item.link && <button className={className}>{item.name}</button>}
    </div>
  )
}



const SidebarNav = () => {
  return (
    <div id="AppSidebarNav" className="w-[250px] px-4 py-4">
      {/* Sidebar Nav Section */}
      <div className="mb-10">
        {/* <div className="text-xs text-center text-gray-500 mb-4">
          Core Modules
        </div> */}
        {itemsCore.map((item,index) => (
          <SidebarNavLink key={index} item={item} />
        ))}
      </div>
      {/* <div className="mb-10">
        <div className="text-xs text-center text-gray-500 mb-4">Misc</div>
        {itemsMisc.map((item) => (
          <SidebarNavLink item={item} />
        ))}
      </div> */}
    </div>
  )
}

export default SidebarNav
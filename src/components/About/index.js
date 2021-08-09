import  Button  from 'src/components/common/Button'
import { useHistory } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useContext } from 'react'
import { SongInfoContext } from '../../context/SongInfoContext'
import brandLogo from 'src/pictures/logo.png'
import logo from 'src/pictures/logo192.png'
import './index.css'

export function About() {
  const history = useHistory()
  const {isLogin, nameUsr} = useContext(SongInfoContext)
  return (
    <>
      <TopNavbar/>
      <div className="lading-page-content">
        {
          isLogin ?
            <div className="item greeting">
              <div className="greeting-text">
                <span>Chào mừng </span>
                <span className="username">{nameUsr}</span>
                <span> đã quay trở lại! Tạo sản phẩm âm nhạc của riêng mình ngay nào! </span>
              </div>
              <div className="spacing"/>
              <Button onClick={() => history.push('/init')} className="create-song">
                Tạo bài hát
              </Button> 
            </div>
            :
            <div className="item greeting unauth">
              Chào các bạn, nhóm chúng mình là những sinh viên năm cuối đến từ khoa Khoa học và Kỹ thuật Máy tính,
              trường Đại học Bách Khoa - ĐH Quốc gia TPHCM. Hiện tại chúng mình đang thực hiện đề tài luận văn 
              "Tự động sáng tác âm nhạc sử dụng Học sâu". Với đề tài này, chúng mình sử dụng mô hình trí tuệ nhân 
              tạo có khả năng "học" các bản nhạc cổ điển và sáng tác một bản nhạc mới từ một vài nốt/hợp âm khởi tạo.
            </div>
        }
        <div className="item intro-container">
          <img src={logo} className='main-logo'/>
          <div className="spacing"/>
          <div className="intro-text">
            Ứng dụng Hit Maker được xây dựng với mục đích giải trí, giúp các bạn không có hoặc có ít kiến thức âm nhạc có thể 
            tạo ra bản nhạc của riêng mình với sự hỗ trợ từ mô hình học sâu. Các bản nhạc do ứng dụng sản xuất người dùng
            có toàn quyền sử dụng, nhóm tác giả không sở hữu bất kì sản phẩm âm nhạc nào. 
          </div>
        </div>
        { 
          !isLogin && 
          <div className="item authen">
            <span className="authen-intro">Cùng trải nghiệm ứng dụng ngay thôi nào!</span>
            <div >
              <span> Đã có tài khoản? </span>
              <a href="/login" className='authen-link'>Đăng nhập</a>
            </div>
            <div>
              <span> Chưa có tài khoản? </span>
              <a href="/signup" className='authen-link'>Đăng kí</a>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export function TopNavbar() {
  const history = useHistory()
  const { isLogin, nameUsr, logout } = useContext(SongInfoContext)
  let navlinks
  const onLogout = () => {
    logout()
    history.push('/')
  } 

  if (isLogin) {
    navlinks = <Nav>
      <Nav.Link style={{color: '#e3cf1e'}} onClick ={() => history.push('/user')}>{nameUsr}</Nav.Link>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick ={() => onLogout()}>Log out</Nav.Link>
    </Nav>
  } else {
    navlinks = <Nav>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick={() => history.push('/login')}>Log in</Nav.Link>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick={() => history.push('/signup')}>Sign up</Nav.Link>
    </Nav>
  }
  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <div className="hit-maker-logo" onClick={() => history.push('/')}>
            <img src={brandLogo} alt="HIT MAKER" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {navlinks}
        </Navbar.Collapse>
                
      </Container>
    </Navbar>
  )
}
import "./index.css"


function CodeLangBox (){

    return(
        <div className="project-info-container">
            <div className='code-languages-container'>
                <div className="code-lang">
                    <span>
                    <i className="devicon-python-plain"></i>
                         Python
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-flask-original"></i>
                        Flask
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-git-plain"></i>
                        Git
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-html5-plain"></i>
                        HTML
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-css3-plain-wordmark"></i>
                        CSS
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-javascript-plain"></i>

                        Javascript
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-sqlalchemy-plain"></i>
                        SQL Alchemy
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-react-original"></i>
                        React
                    </span>
                </div>
                <div className="code-lang">
                    <span>
                    <i className="devicon-redux-original"></i>
                        Redux
                    </span>
                </div>
            </div>
            <a href="https://github.com/marcsmithr" target="_blank">
            <div className="about-me">
                    <div className="git-hub-span-container">
                    <i class="fa-brands fa-github"></i>
                        <span className="git-hub-span">Git Hub</span>
                    </div>
            </div>
            </a>
            <a href="https://www.linkedin.com/in/marc-smith-240720224/" target="_blank">
            <div className="about-me">
                    <div className="git-hub-span-container">
                        <i class="fa-brands fa-linkedin"></i>
                        <span className="git-hub-span">LinkedIn</span>
                    </div>
            </div>
            </a>
            <a href="https://wellfound.com/u/marc-smith-24" target="_blank">
            <div className="about-me">
                    <div className="git-hub-span-container">
                        <i class="fa-brands fa-angellist"></i>
                        <span className="git-hub-span">Wellfound</span>
                    </div>
            </div>
            </a>
        </div>
    )


}

export default CodeLangBox

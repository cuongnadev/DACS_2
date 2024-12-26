import { NavSidebar, Header } from '.';

function PrimaryLayout ({title, children, search}) {

    return (
        <div className="primary-layout h-screen flex">
            {/* navigation */}
            <nav><NavSidebar /></nav>

            {/* content */}
            <main className="primary-layout_main flex flex-col flex-1">
                {/* header */}
                <Header search={search} title={title}/>

                {/* main content */}
                {children}
            </main>
        </div>
    );
}

export default PrimaryLayout;
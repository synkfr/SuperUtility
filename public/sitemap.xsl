<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns="http://www.w3.org/1999/xhtml">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>XML Sitemap | SuperUtility</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap" />
                <style>
                    :root {
                        --bg-base: #f9fafb;
                        --bg-surface: #ffffff;
                        --bg-secondary: #f3f4f6;
                        --lime-50: #f7fee7;
                        --lime-100: #ecfccb;
                        --lime-500: #84cc16;
                        --lime-600: #65a30d;
                        --lime-700: #4d7c0f;
                        --text-primary: #111827;
                        --text-secondary: #4b5563;
                        --text-muted: #9ca3af;
                        --border: #f3f4f6;
                        --border-dark: #e5e7eb;
                        --radius-md: 12px;
                        --radius-lg: 20px;
                        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
                        --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.06);
                        --shadow-premium: 0 20px 40px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02);
                        --shadow-lime: 0 10px 20px -4px rgba(132, 204, 22, 0.2);
                    }

                    body {
                        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background-color: var(--bg-base);
                        color: var(--text-primary);
                        margin: 0;
                        padding: 48px 24px;
                        line-height: 1.5;
                        -webkit-font-smoothing: antialiased;
                    }

                    .container {
                        max-width: 1024px;
                        margin: 0 auto;
                    }

                    /* Header card styling */
                    .header {
                        background: linear-gradient(135deg, var(--lime-500) 0%, var(--lime-600) 100%);
                        color: white;
                        padding: 40px;
                        border-radius: var(--radius-lg);
                        box-shadow: var(--shadow-lime), var(--shadow-md);
                        margin-bottom: 32px;
                        position: relative;
                        overflow: hidden;
                    }

                    .header::after {
                        content: '';
                        position: absolute;
                        top: -50%;
                        right: -20%;
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%);
                        border-radius: 50%;
                        pointer-events: none;
                    }

                    .header h1 {
                        margin: 0 0 12px 0;
                        font-size: 2.5rem;
                        font-weight: 800;
                        letter-spacing: -0.03em;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }

                    .header p {
                        margin: 0;
                        opacity: 0.95;
                        font-size: 1.05rem;
                        font-weight: 500;
                        max-width: 700px;
                        line-height: 1.6;
                    }

                    /* Interactive dynamic stats summary */
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                        gap: 20px;
                        margin-bottom: 32px;
                    }

                    .stat-card {
                        background: var(--bg-surface);
                        padding: 24px;
                        border-radius: var(--radius-md);
                        box-shadow: var(--shadow-sm);
                        border: 1px solid var(--border-dark);
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                    }

                    .stat-card:hover {
                        transform: translateY(-2px);
                        box-shadow: var(--shadow-md);
                    }

                    .stat-card .label {
                        font-size: 0.85rem;
                        color: var(--text-secondary);
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-bottom: 6px;
                    }

                    .stat-card .value {
                        font-size: 2rem;
                        font-weight: 800;
                        color: var(--text-primary);
                    }

                    .stat-card.accent-card {
                        border-left: 4px solid var(--lime-500);
                    }

                    /* Search panel */
                    .search-container {
                        margin-bottom: 24px;
                        position: relative;
                    }

                    .search-input {
                        width: 100%;
                        padding: 16px 20px;
                        border-radius: var(--radius-md);
                        border: 1px solid var(--border-dark);
                        background-color: var(--bg-surface);
                        font-size: 1rem;
                        font-weight: 500;
                        box-sizing: border-box;
                        font-family: inherit;
                        transition: all 0.2s ease;
                        box-shadow: var(--shadow-sm);
                    }

                    .search-input:focus {
                        outline: none;
                        border-color: var(--lime-500);
                        box-shadow: 0 0 0 4px rgba(132, 204, 22, 0.15), var(--shadow-sm);
                    }

                    .search-results-badge {
                        position: absolute;
                        right: 20px;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: var(--lime-100);
                        color: var(--lime-700);
                        padding: 6px 12px;
                        border-radius: 9999px;
                        font-size: 0.8rem;
                        font-weight: 700;
                    }

                    /* Links Table */
                    .table-container {
                        background: var(--bg-surface);
                        border-radius: var(--radius-md);
                        box-shadow: var(--shadow-premium);
                        border: 1px solid var(--border-dark);
                        overflow: hidden;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        text-align: left;
                    }

                    th {
                        background-color: var(--bg-secondary);
                        padding: 18px 24px;
                        font-size: 0.85rem;
                        font-weight: 800;
                        color: var(--text-secondary);
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        border-bottom: 1px solid var(--border-dark);
                    }

                    td {
                        padding: 18px 24px;
                        font-size: 0.95rem;
                        color: var(--text-primary);
                        border-bottom: 1px solid var(--border-dark);
                        vertical-align: middle;
                    }

                    tr:last-child td {
                        border-bottom: none;
                    }

                    tr:hover td {
                        background-color: var(--lime-50);
                    }

                    .url-cell {
                        max-width: 450px;
                        word-break: break-all;
                    }

                    .url-link {
                        color: var(--text-primary);
                        text-decoration: none;
                        font-weight: 600;
                        transition: color 0.15s ease;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                    }

                    .url-link:hover {
                        color: var(--lime-600);
                    }

                    .url-prefix {
                        color: var(--text-muted);
                        font-weight: 400;
                    }

                    .badge {
                        display: inline-flex;
                        align-items: center;
                        padding: 6px 10px;
                        border-radius: 8px;
                        font-size: 0.75rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.02em;
                    }

                    .badge-high {
                        background-color: var(--lime-100);
                        color: var(--lime-700);
                    }

                    .badge-medium {
                        background-color: #f3f4f6;
                        color: #374151;
                    }

                    .badge-low {
                        background-color: #f9fafb;
                        color: #9ca3af;
                        border: 1px dashed var(--border-dark);
                    }

                    .time-stamp {
                        font-family: 'JetBrains Mono', monospace;
                        font-size: 0.825rem;
                        color: var(--text-secondary);
                    }

                    .footer {
                        text-align: center;
                        margin-top: 48px;
                        color: var(--text-muted);
                        font-size: 0.85rem;
                        font-weight: 500;
                    }

                    .footer a {
                        color: var(--text-secondary);
                        text-decoration: none;
                        font-weight: 600;
                    }

                    .footer a:hover {
                        color: var(--lime-600);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Premium Header -->
                    <div class="header">
                        <h1>SuperUtility Sitemap</h1>
                        <p>This is a machine-readable XML sitemap generated dynamically by Next.js and styled for human searchers, audit engineers, and developers. Search engines read the raw XML data below, while humans enjoy an interactive, searchable portal.</p>
                    </div>

                    <!-- Statistics Dashboard -->
                    <div class="stats-grid">
                        <div class="stat-card accent-card">
                            <div class="label">Total Discovered Pages</div>
                            <div class="value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                        </div>
                        <div class="stat-card">
                            <div class="label">Utility Tools</div>
                            <div class="value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tools/')])"/></div>
                        </div>
                        <div class="stat-card">
                            <div class="label">Core Static Pages</div>
                            <div class="value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[not(contains(sitemap:loc, '/tools/'))])"/></div>
                        </div>
                    </div>

                    <!-- Live Filter Search Panel -->
                    <div class="search-container">
                        <input type="text" id="search" class="search-input" placeholder="Search tools or pages (e.g. pdf, image, background remover...)" onkeyup="filterSitemap()" autofocus="autofocus" />
                        <span class="search-results-badge">
                            <span id="match-count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span> Matched
                        </span>
                    </div>

                    <!-- Links Table -->
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width: 50px; text-align: center;">#</th>
                                    <th>URL Pathway</th>
                                    <th style="width: 120px; text-align: center;">Priority</th>
                                    <th style="width: 150px;">Change Freq</th>
                                    <th style="width: 220px;">Last Modified</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="sitemap:urlset/sitemap:url">
                                    <xsl:sort select="sitemap:priority" data-type="number" order="descending"/>
                                    <tr>
                                        <td style="text-align: center; color: var(--text-muted); font-weight: 600;">
                                            <xsl:value-of select="position()"/>
                                        </td>
                                        <td class="url-cell">
                                            <a class="url-link" href="{sitemap:loc}">
                                                <span class="url-prefix">https://superutility.xyz</span>
                                                <xsl:choose>
                                                    <xsl:when test="sitemap:loc = 'https://superutility.xyz'">
                                                        <strong>/</strong>
                                                    </xsl:when>
                                                    <xsl:when test="contains(sitemap:loc, 'https://superutility.xyz/')">
                                                        <strong>/<xsl:value-of select="substring-after(sitemap:loc, 'https://superutility.xyz/')"/></strong>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <strong>/<xsl:value-of select="sitemap:loc"/></strong>
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <xsl:choose>
                                                <xsl:when test="sitemap:priority &gt;= 0.8">
                                                    <span class="badge badge-high"><xsl:value-of select="format-number(sitemap:priority * 100, '0')"/>%</span>
                                                </xsl:when>
                                                <xsl:when test="sitemap:priority &gt;= 0.4">
                                                    <span class="badge badge-medium"><xsl:value-of select="format-number(sitemap:priority * 100, '0')"/>%</span>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <span class="badge badge-low"><xsl:value-of select="format-number(sitemap:priority * 100, '0')"/>%</span>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </td>
                                        <td>
                                            <span class="badge badge-medium">
                                                <xsl:value-of select="sitemap:changefreq"/>
                                            </span>
                                        </td>
                                        <td>
                                            <span class="time-stamp">
                                                <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>&#160;<xsl:value-of select="substring(sitemap:lastmod, 12, 8)"/>
                                            </span>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        SuperUtility XML Sitemap Portal • Back to <a href="https://superutility.xyz">superutility.xyz</a>
                    </div>
                </div>

                <script type="text/javascript">
                    <![CDATA[
                    function filterSitemap() {
                        const query = document.getElementById('search').value.toLowerCase().trim();
                        const rows = document.querySelectorAll('tbody tr');
                        let matchCount = 0;
                        
                        rows.forEach(row => {
                            const urlCell = row.querySelector('.url-link');
                            const urlText = urlCell ? urlCell.textContent.toLowerCase() : '';
                            
                            if (urlText.includes(query)) {
                                row.style.display = '';
                                matchCount++;
                            } else {
                                row.style.display = 'none';
                            }
                        });
                        
                        document.getElementById('match-count').textContent = matchCount;
                    }
                    ]]>
                </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

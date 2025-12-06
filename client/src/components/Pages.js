// src/components/Pages.js
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

const Pages = observer(() => {
	const { device } = useContext(Context)
	const pageCount = Math.ceil(device.totalCount / device.limit)
	const pages = []

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}

	// Если страниц меньше 2, не показываем пагинацию
	if (pageCount < 2) {
		return null
	}

	return (
		<Pagination className='mt-4 justify-content-center'>
			{/* Кнопка "Первая страница" */}
			<Pagination.First
				onClick={() => device.setPage(1)}
				disabled={device.page === 1}
				style={{
					background:
						device.page === 1
							? 'rgba(100, 100, 100, 0.2)'
							: 'rgba(255, 107, 53, 0.1)',
					border: '2px solid rgba(255, 107, 53, 0.3)',
					color: '#ff6b35',
				}}
			/>

			{/* Кнопка "Предыдущая" */}
			<Pagination.Prev
				onClick={() => device.setPage(device.page - 1)}
				disabled={device.page === 1}
				style={{
					background:
						device.page === 1
							? 'rgba(100, 100, 100, 0.2)'
							: 'rgba(255, 107, 53, 0.1)',
					border: '2px solid rgba(255, 107, 53, 0.3)',
					color: '#ff6b35',
					marginRight: '10px',
				}}
			/>

			{/* Номера страниц */}
			{pages.map(page => {
				// Показываем только ближайшие страницы
				const currentPage = device.page
				const showPage =
					page === 1 ||
					page === pageCount ||
					(page >= currentPage - 2 && page <= currentPage + 2)

				if (!showPage) {
					// Показываем "..." между страницами
					if (page === currentPage - 3 || page === currentPage + 3) {
						return (
							<Pagination.Ellipsis
								key={page}
								disabled
								style={{
									background: 'transparent',
									border: 'none',
									color: '#888',
								}}
							/>
						)
					}
					return null
				}

				return (
					<Pagination.Item
						key={page}
						active={device.page === page}
						onClick={() => device.setPage(page)}
						style={{
							margin: '0 3px',
						}}
						className={device.page === page ? 'active-page' : ''}
					>
						{page}
					</Pagination.Item>
				)
			})}

			{/* Кнопка "Следующая" */}
			<Pagination.Next
				onClick={() => device.setPage(device.page + 1)}
				disabled={device.page === pageCount}
				style={{
					background:
						device.page === pageCount
							? 'rgba(100, 100, 100, 0.2)'
							: 'rgba(255, 107, 53, 0.1)',
					border: '2px solid rgba(255, 107, 53, 0.3)',
					color: '#ff6b35',
					marginLeft: '10px',
				}}
			/>

			{/* Кнопка "Последняя страница" */}
			<Pagination.Last
				onClick={() => device.setPage(pageCount)}
				disabled={device.page === pageCount}
				style={{
					background:
						device.page === pageCount
							? 'rgba(100, 100, 100, 0.2)'
							: 'rgba(255, 107, 53, 0.1)',
					border: '2px solid rgba(255, 107, 53, 0.3)',
					color: '#ff6b35',
				}}
			/>

			{/* Стили для активной страницы */}
			<style jsx='true'>{`
				.active-page .page-link {
					background: linear-gradient(
						135deg,
						#ff6b35 0%,
						#ff8555 100%
					) !important;
					border-color: #ff6b35 !important;
					color: white !important;
					font-weight: bold;
					box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
				}

				.pagination .page-link {
					background: rgba(255, 107, 53, 0.1);
					border: 2px solid rgba(255, 107, 53, 0.3);
					color: #ff6b35;
					margin: 0 3px;
					border-radius: 8px;
					transition: all 0.3s ease;
				}

				.pagination .page-link:hover {
					background: rgba(255, 107, 53, 0.2);
					border-color: #ff6b35;
					transform: translateY(-2px);
					box-shadow: 0 4px 10px rgba(255, 107, 53, 0.2);
				}

				.pagination .page-link:disabled {
					background: rgba(100, 100, 100, 0.2);
					border-color: rgba(100, 100, 100, 0.3);
					color: #666;
				}
			`}</style>
		</Pagination>
	)
})

export default Pages

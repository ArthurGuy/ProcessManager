@extends('layouts.app')

@section('content')
	<div class="container-fluid">

		<h1>Pings</h1>

		@if (count($pings) > 0)
			<div class="card">

				<div class="card-text">
					<table class="table table-striped task-table">
						<thead>
							<th>Name</th>
							<th>Description</th>
							<th>&nbsp;</th>
						</thead>
						<tbody>
							@foreach ($pings as $ping)
								<tr>
									<td class="table-text"><div>{{ $ping->name }}</div></td>
									<td class="table-text"><div>{{ $ping->description }}</div></td>

									<td>
										<form action="/cron/{{ $ping->id }}" method="POST">
											{{ csrf_field() }}
											{{ method_field('DELETE') }}

											<button type="submit" class="btn btn-danger">Delete</button>
										</form>
									</td>
								</tr>
							@endforeach
						</tbody>
					</table>
				</div>
			</div>
		@endif
	</div>
@endsection

<div ng-app="app">
    <div ng-controller="AppController">
        <input type="file" nv-file-select uploader="uploader"/><br/>
        <ul>
            <li ng-repeat="item in uploader.queue">
                Name: <span ng-bind="item.file.name"></span><br/>
                <button ng-click="item.upload()">upload</button>
            </li>
        </ul>
    </div>
</div>
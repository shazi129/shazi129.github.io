# MeshPassProcessor

[TOC]

## 简介

功能：生成`MeshDrawCommand`。

实现方式：提供接口`AddMeshPass`给外部调用，在其中收集完数据后调用统一接口`BuildMeshDrawCommands`生成`MeshDrawCommand`

创建方式：使用`FRegisterPassProcessorCreateFunction`, 在构造函数内将创建函数加入到`FPassProcessorManager::JumpTable`。一个Processor通常在创建完`MeshDrawCommand`之后就会被析构。








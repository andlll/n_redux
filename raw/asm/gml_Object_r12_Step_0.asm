// gml_Object_r12_Step_0  locals=2 args=0 len=6492
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v allerta
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C7880
0000004C: push.imm.e 3
00000050: conv.i.v
00000054: push.imm.e 1000
00000058: conv.i.v
0000005C: push.v oil
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20C7880
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 646
00000098: conv.i.v
0000009C: call action_create_object(argc=3)
000000A4: popz
000000A8: push.imm.e 1
000000AC: pop.v.i allerta
000000B4: push.imm.e 2
000000B8: conv.i.v
000000BC: push.imm.e 99
000000C0: conv.i.v
000000C4: push.v crys
000000CC: call action_if_variable(argc=3)
000000D4: pop.v.v local.__b__
000000DC: push.local.v local.__b__
000000E4: conv.v.b
000000E8: bf 0x20C78C4
000000EC: push.imm.e 99
000000F0: pop.v.i crys
000000F8: push.imm.e 1
000000FC: conv.i.v
00000100: push.imm.e -100
00000104: conv.i.v
00000108: push.v ele
00000110: call action_if_variable(argc=3)
00000118: pop.v.v local.__b__
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20C7908
00000130: push.imm.e -100
00000134: pop.v.i ele
0000013C: push.imm.e 2
00000140: conv.i.v
00000144: push.imm.e 9999
00000148: conv.i.v
0000014C: push.v ele
00000154: call action_if_variable(argc=3)
0000015C: pop.v.v local.__b__
00000164: push.local.v local.__b__
0000016C: conv.v.b
00000170: bf 0x20C794C
00000174: push.imm.e 9999
00000178: pop.v.i ele
00000180: push.imm.e 2
00000184: conv.i.v
00000188: push.i 999998
00000190: conv.i.v
00000194: push.v mon
0000019C: call action_if_variable(argc=3)
000001A4: pop.v.v local.__b__
000001AC: push.local.v local.__b__
000001B4: conv.v.b
000001B8: bf 0x20C7998
000001BC: push.i 999999
000001C4: pop.v.i mon
000001CC: push.imm.e 1
000001D0: conv.i.v
000001D4: push.imm.e 0
000001D8: conv.i.v
000001DC: push.v pop
000001E4: call action_if_variable(argc=3)
000001EC: pop.v.v local.__b__
000001F4: push.local.v local.__b__
000001FC: conv.v.b
00000200: bf 0x20C79DC
00000204: push.imm.e 0
00000208: pop.v.i pop
00000210: push.imm.e 0
00000214: conv.i.v
00000218: push.imm.e 1
0000021C: conv.i.v
00000220: push.imm.e 736
00000224: conv.i.v
00000228: call action_if_number(argc=3)
00000230: pop.v.v local.__b__
00000238: push.local.v local.__b__
00000240: conv.v.b
00000244: bf 0x20C7A58
00000248: push.imm.e 1
0000024C: conv.i.v
00000250: push.imm.e 0
00000254: conv.i.v
00000258: push.v oil
00000260: call action_if_variable(argc=3)
00000268: pop.v.v local.__b__
00000270: push.local.v local.__b__
00000278: conv.v.b
0000027C: bf 0x20C7A58
00000280: push.imm.e 0
00000284: pop.v.i oil
0000028C: push.imm.e 154
00000290: pushenv 0x20C7A9C
00000294: push.imm.e 1
00000298: conv.i.v
0000029C: push.imm.e 2
000002A0: conv.i.v
000002A4: push.v level
000002AC: call action_if_variable(argc=3)
000002B4: pop.v.v local.__b__
000002BC: push.local.v local.__b__
000002C4: conv.v.b
000002C8: bf 0x20C7A9C
000002CC: b 0x20C7AA4
000002D0: popenv 0x40C7A60
000002D4: b 0x20C7AA8
000002D8: popenv 0x1CC7AA4
000002DC: push.local.v local.__b__
000002E4: conv.v.b
000002E8: bf 0x20C7AFC
000002EC: push.imm.e 4
000002F0: conv.i.v
000002F4: push.imm.e 20000
000002F8: conv.i.v
000002FC: push.v oil
00000304: call action_if_variable(argc=3)
0000030C: pop.v.v local.__b__
00000314: push.local.v local.__b__
0000031C: conv.v.b
00000320: bf 0x20C7AFC
00000324: push.imm.e 20000
00000328: pop.v.i oil
00000330: push.imm.e 154
00000334: pushenv 0x20C7B40
00000338: push.imm.e 1
0000033C: conv.i.v
00000340: push.imm.e 3
00000344: conv.i.v
00000348: push.v level
00000350: call action_if_variable(argc=3)
00000358: pop.v.v local.__b__
00000360: push.local.v local.__b__
00000368: conv.v.b
0000036C: bf 0x20C7B40
00000370: b 0x20C7B48
00000374: popenv 0x40C7B04
00000378: b 0x20C7B4C
0000037C: popenv 0x1CC7B48
00000380: push.local.v local.__b__
00000388: conv.v.b
0000038C: bf 0x20C7BA0
00000390: push.imm.e 4
00000394: conv.i.v
00000398: push.imm.e 30000
0000039C: conv.i.v
000003A0: push.v oil
000003A8: call action_if_variable(argc=3)
000003B0: pop.v.v local.__b__
000003B8: push.local.v local.__b__
000003C0: conv.v.b
000003C4: bf 0x20C7BA0
000003C8: push.imm.e 30000
000003CC: pop.v.i oil
000003D4: push.imm.e 154
000003D8: pushenv 0x20C7BE4
000003DC: push.imm.e 1
000003E0: conv.i.v
000003E4: push.imm.e 4
000003E8: conv.i.v
000003EC: push.v level
000003F4: call action_if_variable(argc=3)
000003FC: pop.v.v local.__b__
00000404: push.local.v local.__b__
0000040C: conv.v.b
00000410: bf 0x20C7BE4
00000414: b 0x20C7BEC
00000418: popenv 0x40C7BA8
0000041C: b 0x20C7BF0
00000420: popenv 0x1CC7BEC
00000424: push.local.v local.__b__
0000042C: conv.v.b
00000430: bf 0x20C7C4C
00000434: push.imm.e 4
00000438: conv.i.v
0000043C: push.i 50000
00000444: conv.i.v
00000448: push.v oil
00000450: call action_if_variable(argc=3)
00000458: pop.v.v local.__b__
00000460: push.local.v local.__b__
00000468: conv.v.b
0000046C: bf 0x20C7C4C
00000470: push.i 50000
00000478: pop.v.i oil
00000480: push.imm.e 0
00000484: conv.i.v
00000488: push.imm.e 4
0000048C: conv.i.v
00000490: push.v bombolo
00000498: call action_if_variable(argc=3)
000004A0: pop.v.v local.__b__
000004A8: push.local.v local.__b__
000004B0: conv.v.b
000004B4: bf 0x20C7CD0
000004B8: push.imm.e 0
000004BC: pop.v.i bombolo
000004C4: push.imm.e 1
000004C8: conv.i.v
000004CC: call action_set_relative(argc=1)
000004D4: popz
000004D8: push.v bombus
000004E0: push.imm.e 1
000004E4: add.i.v
000004E8: pop.v.v bombus
000004F0: push.imm.e 0
000004F4: conv.i.v
000004F8: call action_set_relative(argc=1)
00000500: popz
00000504: push.imm.e 0
00000508: conv.i.v
0000050C: push.imm.e 10
00000510: conv.i.v
00000514: push.v dirox
0000051C: call action_if_variable(argc=3)
00000524: pop.v.v local.__b__
0000052C: push.local.v local.__b__
00000534: conv.v.b
00000538: bf 0x20C7D54
0000053C: push.imm.e 1
00000540: conv.i.v
00000544: call action_set_relative(argc=1)
0000054C: popz
00000550: push.v diro
00000558: push.imm.e 1
0000055C: add.i.v
00000560: pop.v.v diro
00000568: push.imm.e 0
0000056C: conv.i.v
00000570: call action_set_relative(argc=1)
00000578: popz
0000057C: push.imm.e 0
00000580: pop.v.i dirox
00000588: push.imm.e 2
0000058C: conv.i.v
00000590: push.imm.e 0
00000594: conv.i.v
00000598: push.v arma
000005A0: call action_if_variable(argc=3)
000005A8: pop.v.v local.__b__
000005B0: push.local.v local.__b__
000005B8: conv.v.b
000005BC: bf 0x20C7DEC
000005C0: push.imm.e 4
000005C4: conv.i.v
000005C8: push.imm.e 60
000005CC: conv.i.v
000005D0: call action_set_alarm(argc=2)
000005D8: popz
000005DC: push.imm.e 5
000005E0: conv.i.v
000005E4: push.imm.e 200
000005E8: conv.i.v
000005EC: call action_set_alarm(argc=2)
000005F4: popz
000005F8: push.imm.e 6
000005FC: conv.i.v
00000600: push.imm.e 600
00000604: conv.i.v
00000608: call action_set_alarm(argc=2)
00000610: popz
00000614: push.imm.e 0
00000618: pop.v.i arma
00000620: push.imm.e 0
00000624: conv.i.v
00000628: push.imm.e 0
0000062C: conv.i.v
00000630: push.imm.e 736
00000634: conv.i.v
00000638: call action_if_number(argc=3)
00000640: pop.v.v local.__b__
00000648: push.local.v local.__b__
00000650: conv.v.b
00000654: bf 0x20C9114
00000658: push.imm.e 0
0000065C: conv.i.v
00000660: push.imm.e 0
00000664: conv.i.v
00000668: push.imm.e 291
0000066C: conv.i.v
00000670: call action_if_number(argc=3)
00000678: pop.v.v local.__b__
00000680: push.local.v local.__b__
00000688: conv.v.b
0000068C: bf 0x20C9114
00000690: push.imm.e 0
00000694: conv.i.v
00000698: push.imm.e 0
0000069C: conv.i.v
000006A0: push.v dara
000006A8: call action_if_variable(argc=3)
000006B0: pop.v.v local.__b__
000006B8: push.local.v local.__b__
000006C0: conv.v.b
000006C4: bf 0x20C9114
000006C8: push.imm.e 3
000006CC: conv.i.v
000006D0: push.imm.e 0
000006D4: conv.i.v
000006D8: push.v oil
000006E0: call action_if_variable(argc=3)
000006E8: pop.v.v local.__b__
000006F0: push.local.v local.__b__
000006F8: conv.v.b
000006FC: bf 0x20C9114
00000700: push.imm.e 1
00000704: pop.v.i dara
0000070C: push.imm.e -100
00000710: pop.v.i ele
00000718: push.imm.e 336
0000071C: pushenv 0x20C7EF8
00000720: call action_kill_object(argc=0)
00000728: popz
0000072C: popenv 0x40C7EEC
00000730: push.imm.e 298
00000734: pushenv 0x20C7F10
00000738: call action_kill_object(argc=0)
00000740: popz
00000744: popenv 0x40C7F04
00000748: push.imm.e 468
0000074C: pushenv 0x20C7F28
00000750: call action_kill_object(argc=0)
00000758: popz
0000075C: popenv 0x40C7F1C
00000760: push.imm.e 469
00000764: pushenv 0x20C7F40
00000768: call action_kill_object(argc=0)
00000770: popz
00000774: popenv 0x40C7F34
00000778: push.imm.e 295
0000077C: pushenv 0x20C7F58
00000780: call action_kill_object(argc=0)
00000788: popz
0000078C: popenv 0x40C7F4C
00000790: push.imm.e 299
00000794: pushenv 0x20C7F70
00000798: call action_kill_object(argc=0)
000007A0: popz
000007A4: popenv 0x40C7F64
000007A8: push.imm.e 301
000007AC: pushenv 0x20C7F88
000007B0: call action_kill_object(argc=0)
000007B8: popz
000007BC: popenv 0x40C7F7C
000007C0: push.imm.e 300
000007C4: pushenv 0x20C7FA0
000007C8: call action_kill_object(argc=0)
000007D0: popz
000007D4: popenv 0x40C7F94
000007D8: push.imm.e 302
000007DC: pushenv 0x20C7FB8
000007E0: call action_kill_object(argc=0)
000007E8: popz
000007EC: popenv 0x40C7FAC
000007F0: push.imm.e 301
000007F4: pushenv 0x20C7FD0
000007F8: call action_kill_object(argc=0)
00000800: popz
00000804: popenv 0x40C7FC4
00000808: push.imm.e 304
0000080C: pushenv 0x20C7FE8
00000810: call action_kill_object(argc=0)
00000818: popz
0000081C: popenv 0x40C7FDC
00000820: push.imm.e 303
00000824: pushenv 0x20C8000
00000828: call action_kill_object(argc=0)
00000830: popz
00000834: popenv 0x40C7FF4
00000838: push.imm.e 305
0000083C: pushenv 0x20C8018
00000840: call action_kill_object(argc=0)
00000848: popz
0000084C: popenv 0x40C800C
00000850: push.imm.e 306
00000854: pushenv 0x20C8030
00000858: call action_kill_object(argc=0)
00000860: popz
00000864: popenv 0x40C8024
00000868: push.imm.e 307
0000086C: pushenv 0x20C8048
00000870: call action_kill_object(argc=0)
00000878: popz
0000087C: popenv 0x40C803C
00000880: push.imm.e 308
00000884: pushenv 0x20C8060
00000888: call action_kill_object(argc=0)
00000890: popz
00000894: popenv 0x40C8054
00000898: push.imm.e 309
0000089C: pushenv 0x20C8078
000008A0: call action_kill_object(argc=0)
000008A8: popz
000008AC: popenv 0x40C806C
000008B0: push.imm.e 310
000008B4: pushenv 0x20C8090
000008B8: call action_kill_object(argc=0)
000008C0: popz
000008C4: popenv 0x40C8084
000008C8: push.imm.e 311
000008CC: pushenv 0x20C80A8
000008D0: call action_kill_object(argc=0)
000008D8: popz
000008DC: popenv 0x40C809C
000008E0: push.imm.e 312
000008E4: pushenv 0x20C80C0
000008E8: call action_kill_object(argc=0)
000008F0: popz
000008F4: popenv 0x40C80B4
000008F8: push.imm.e 313
000008FC: pushenv 0x20C80D8
00000900: call action_kill_object(argc=0)
00000908: popz
0000090C: popenv 0x40C80CC
00000910: push.imm.e 314
00000914: pushenv 0x20C80F0
00000918: call action_kill_object(argc=0)
00000920: popz
00000924: popenv 0x40C80E4
00000928: push.imm.e 315
0000092C: pushenv 0x20C8108
00000930: call action_kill_object(argc=0)
00000938: popz
0000093C: popenv 0x40C80FC
00000940: push.imm.e 316
00000944: pushenv 0x20C8120
00000948: call action_kill_object(argc=0)
00000950: popz
00000954: popenv 0x40C8114
00000958: push.imm.e 317
0000095C: pushenv 0x20C8138
00000960: call action_kill_object(argc=0)
00000968: popz
0000096C: popenv 0x40C812C
00000970: push.imm.e 318
00000974: pushenv 0x20C8150
00000978: call action_kill_object(argc=0)
00000980: popz
00000984: popenv 0x40C8144
00000988: push.imm.e 319
0000098C: pushenv 0x20C8168
00000990: call action_kill_object(argc=0)
00000998: popz
0000099C: popenv 0x40C815C
000009A0: push.imm.e 319
000009A4: pushenv 0x20C8180
000009A8: call action_kill_object(argc=0)
000009B0: popz
000009B4: popenv 0x40C8174
000009B8: push.imm.e 320
000009BC: pushenv 0x20C8198
000009C0: call action_kill_object(argc=0)
000009C8: popz
000009CC: popenv 0x40C818C
000009D0: push.imm.e 321
000009D4: pushenv 0x20C81B0
000009D8: call action_kill_object(argc=0)
000009E0: popz
000009E4: popenv 0x40C81A4
000009E8: push.imm.e 322
000009EC: pushenv 0x20C81C8
000009F0: call action_kill_object(argc=0)
000009F8: popz
000009FC: popenv 0x40C81BC
00000A00: push.imm.e 323
00000A04: pushenv 0x20C81E0
00000A08: call action_kill_object(argc=0)
00000A10: popz
00000A14: popenv 0x40C81D4
00000A18: push.imm.e 324
00000A1C: pushenv 0x20C81F8
00000A20: call action_kill_object(argc=0)
00000A28: popz
00000A2C: popenv 0x40C81EC
00000A30: push.imm.e 325
00000A34: pushenv 0x20C8210
00000A38: call action_kill_object(argc=0)
00000A40: popz
00000A44: popenv 0x40C8204
00000A48: push.imm.e 324
00000A4C: pushenv 0x20C8228
00000A50: call action_kill_object(argc=0)
00000A58: popz
00000A5C: popenv 0x40C821C
00000A60: push.imm.e 326
00000A64: pushenv 0x20C8240
00000A68: call action_kill_object(argc=0)
00000A70: popz
00000A74: popenv 0x40C8234
00000A78: push.imm.e 327
00000A7C: pushenv 0x20C8258
00000A80: call action_kill_object(argc=0)
00000A88: popz
00000A8C: popenv 0x40C824C
00000A90: push.imm.e 328
00000A94: pushenv 0x20C8270
00000A98: call action_kill_object(argc=0)
00000AA0: popz
00000AA4: popenv 0x40C8264
00000AA8: push.imm.e 329
00000AAC: pushenv 0x20C8288
00000AB0: call action_kill_object(argc=0)
00000AB8: popz
00000ABC: popenv 0x40C827C
00000AC0: push.imm.e 330
00000AC4: pushenv 0x20C82A0
00000AC8: call action_kill_object(argc=0)
00000AD0: popz
00000AD4: popenv 0x40C8294
00000AD8: push.imm.e 331
00000ADC: pushenv 0x20C82B8
00000AE0: call action_kill_object(argc=0)
00000AE8: popz
00000AEC: popenv 0x40C82AC
00000AF0: push.imm.e 332
00000AF4: pushenv 0x20C82D0
00000AF8: call action_kill_object(argc=0)
00000B00: popz
00000B04: popenv 0x40C82C4
00000B08: push.imm.e 333
00000B0C: pushenv 0x20C82E8
00000B10: call action_kill_object(argc=0)
00000B18: popz
00000B1C: popenv 0x40C82DC
00000B20: push.imm.e 334
00000B24: pushenv 0x20C8300
00000B28: call action_kill_object(argc=0)
00000B30: popz
00000B34: popenv 0x40C82F4
00000B38: push.imm.e 335
00000B3C: pushenv 0x20C8318
00000B40: call action_kill_object(argc=0)
00000B48: popz
00000B4C: popenv 0x40C830C
00000B50: push.imm.e 336
00000B54: pushenv 0x20C8330
00000B58: call action_kill_object(argc=0)
00000B60: popz
00000B64: popenv 0x40C8324
00000B68: push.imm.e 337
00000B6C: pushenv 0x20C8348
00000B70: call action_kill_object(argc=0)
00000B78: popz
00000B7C: popenv 0x40C833C
00000B80: push.imm.e 338
00000B84: pushenv 0x20C8360
00000B88: call action_kill_object(argc=0)
00000B90: popz
00000B94: popenv 0x40C8354
00000B98: push.imm.e 339
00000B9C: pushenv 0x20C8378
00000BA0: call action_kill_object(argc=0)
00000BA8: popz
00000BAC: popenv 0x40C836C
00000BB0: push.imm.e 340
00000BB4: pushenv 0x20C8390
00000BB8: call action_kill_object(argc=0)
00000BC0: popz
00000BC4: popenv 0x40C8384
00000BC8: push.imm.e 341
00000BCC: pushenv 0x20C83A8
00000BD0: call action_kill_object(argc=0)
00000BD8: popz
00000BDC: popenv 0x40C839C
00000BE0: push.imm.e 342
00000BE4: pushenv 0x20C83C0
00000BE8: call action_kill_object(argc=0)
00000BF0: popz
00000BF4: popenv 0x40C83B4
00000BF8: push.imm.e 343
00000BFC: pushenv 0x20C83D8
00000C00: call action_kill_object(argc=0)
00000C08: popz
00000C0C: popenv 0x40C83CC
00000C10: push.imm.e 344
00000C14: pushenv 0x20C83F0
00000C18: call action_kill_object(argc=0)
00000C20: popz
00000C24: popenv 0x40C83E4
00000C28: push.imm.e 345
00000C2C: pushenv 0x20C8408
00000C30: call action_kill_object(argc=0)
00000C38: popz
00000C3C: popenv 0x40C83FC
00000C40: push.imm.e 346
00000C44: pushenv 0x20C8420
00000C48: call action_kill_object(argc=0)
00000C50: popz
00000C54: popenv 0x40C8414
00000C58: push.imm.e 347
00000C5C: pushenv 0x20C8438
00000C60: call action_kill_object(argc=0)
00000C68: popz
00000C6C: popenv 0x40C842C
00000C70: push.imm.e 348
00000C74: pushenv 0x20C8450
00000C78: call action_kill_object(argc=0)
00000C80: popz
00000C84: popenv 0x40C8444
00000C88: push.imm.e 349
00000C8C: pushenv 0x20C8468
00000C90: call action_kill_object(argc=0)
00000C98: popz
00000C9C: popenv 0x40C845C
00000CA0: push.imm.e 350
00000CA4: pushenv 0x20C8480
00000CA8: call action_kill_object(argc=0)
00000CB0: popz
00000CB4: popenv 0x40C8474
00000CB8: push.imm.e 351
00000CBC: pushenv 0x20C8498
00000CC0: call action_kill_object(argc=0)
00000CC8: popz
00000CCC: popenv 0x40C848C
00000CD0: push.imm.e 352
00000CD4: pushenv 0x20C84B0
00000CD8: call action_kill_object(argc=0)
00000CE0: popz
00000CE4: popenv 0x40C84A4
00000CE8: push.imm.e 353
00000CEC: pushenv 0x20C84C8
00000CF0: call action_kill_object(argc=0)
00000CF8: popz
00000CFC: popenv 0x40C84BC
00000D00: push.imm.e 354
00000D04: pushenv 0x20C84E0
00000D08: call action_kill_object(argc=0)
00000D10: popz
00000D14: popenv 0x40C84D4
00000D18: push.imm.e 355
00000D1C: pushenv 0x20C84F8
00000D20: call action_kill_object(argc=0)
00000D28: popz
00000D2C: popenv 0x40C84EC
00000D30: push.imm.e 357
00000D34: pushenv 0x20C8510
00000D38: call action_kill_object(argc=0)
00000D40: popz
00000D44: popenv 0x40C8504
00000D48: push.imm.e 356
00000D4C: pushenv 0x20C8528
00000D50: call action_kill_object(argc=0)
00000D58: popz
00000D5C: popenv 0x40C851C
00000D60: push.imm.e 356
00000D64: pushenv 0x20C8540
00000D68: call action_kill_object(argc=0)
00000D70: popz
00000D74: popenv 0x40C8534
00000D78: push.imm.e 358
00000D7C: pushenv 0x20C8558
00000D80: call action_kill_object(argc=0)
00000D88: popz
00000D8C: popenv 0x40C854C
00000D90: push.imm.e 359
00000D94: pushenv 0x20C8570
00000D98: call action_kill_object(argc=0)
00000DA0: popz
00000DA4: popenv 0x40C8564
00000DA8: push.imm.e 360
00000DAC: pushenv 0x20C8588
00000DB0: call action_kill_object(argc=0)
00000DB8: popz
00000DBC: popenv 0x40C857C
00000DC0: push.imm.e 361
00000DC4: pushenv 0x20C85A0
00000DC8: call action_kill_object(argc=0)
00000DD0: popz
00000DD4: popenv 0x40C8594
00000DD8: push.imm.e 362
00000DDC: pushenv 0x20C85B8
00000DE0: call action_kill_object(argc=0)
00000DE8: popz
00000DEC: popenv 0x40C85AC
00000DF0: push.imm.e 363
00000DF4: pushenv 0x20C85D0
00000DF8: call action_kill_object(argc=0)
00000E00: popz
00000E04: popenv 0x40C85C4
00000E08: push.imm.e 364
00000E0C: pushenv 0x20C85E8
00000E10: call action_kill_object(argc=0)
00000E18: popz
00000E1C: popenv 0x40C85DC
00000E20: push.imm.e 365
00000E24: pushenv 0x20C8600
00000E28: call action_kill_object(argc=0)
00000E30: popz
00000E34: popenv 0x40C85F4
00000E38: push.imm.e 366
00000E3C: pushenv 0x20C8618
00000E40: call action_kill_object(argc=0)
00000E48: popz
00000E4C: popenv 0x40C860C
00000E50: push.imm.e 367
00000E54: pushenv 0x20C8630
00000E58: call action_kill_object(argc=0)
00000E60: popz
00000E64: popenv 0x40C8624
00000E68: push.imm.e 368
00000E6C: pushenv 0x20C8648
00000E70: call action_kill_object(argc=0)
00000E78: popz
00000E7C: popenv 0x40C863C
00000E80: push.imm.e 369
00000E84: pushenv 0x20C8660
00000E88: call action_kill_object(argc=0)
00000E90: popz
00000E94: popenv 0x40C8654
00000E98: push.imm.e 370
00000E9C: pushenv 0x20C8678
00000EA0: call action_kill_object(argc=0)
00000EA8: popz
00000EAC: popenv 0x40C866C
00000EB0: push.imm.e 371
00000EB4: pushenv 0x20C8690
00000EB8: call action_kill_object(argc=0)
00000EC0: popz
00000EC4: popenv 0x40C8684
00000EC8: push.imm.e 372
00000ECC: pushenv 0x20C86A8
00000ED0: call action_kill_object(argc=0)
00000ED8: popz
00000EDC: popenv 0x40C869C
00000EE0: push.imm.e 373
00000EE4: pushenv 0x20C86C0
00000EE8: call action_kill_object(argc=0)
00000EF0: popz
00000EF4: popenv 0x40C86B4
00000EF8: push.imm.e 374
00000EFC: pushenv 0x20C86D8
00000F00: call action_kill_object(argc=0)
00000F08: popz
00000F0C: popenv 0x40C86CC
00000F10: push.imm.e 375
00000F14: pushenv 0x20C86F0
00000F18: call action_kill_object(argc=0)
00000F20: popz
00000F24: popenv 0x40C86E4
00000F28: push.imm.e 376
00000F2C: pushenv 0x20C8708
00000F30: call action_kill_object(argc=0)
00000F38: popz
00000F3C: popenv 0x40C86FC
00000F40: push.imm.e 377
00000F44: pushenv 0x20C8720
00000F48: call action_kill_object(argc=0)
00000F50: popz
00000F54: popenv 0x40C8714
00000F58: push.imm.e 378
00000F5C: pushenv 0x20C8738
00000F60: call action_kill_object(argc=0)
00000F68: popz
00000F6C: popenv 0x40C872C
00000F70: push.imm.e 379
00000F74: pushenv 0x20C8750
00000F78: call action_kill_object(argc=0)
00000F80: popz
00000F84: popenv 0x40C8744
00000F88: push.imm.e 380
00000F8C: pushenv 0x20C8768
00000F90: call action_kill_object(argc=0)
00000F98: popz
00000F9C: popenv 0x40C875C
00000FA0: push.imm.e 381
00000FA4: pushenv 0x20C8780
00000FA8: call action_kill_object(argc=0)
00000FB0: popz
00000FB4: popenv 0x40C8774
00000FB8: push.imm.e 382
00000FBC: pushenv 0x20C8798
00000FC0: call action_kill_object(argc=0)
00000FC8: popz
00000FCC: popenv 0x40C878C
00000FD0: push.imm.e 387
00000FD4: pushenv 0x20C87B0
00000FD8: call action_kill_object(argc=0)
00000FE0: popz
00000FE4: popenv 0x40C87A4
00000FE8: push.imm.e 388
00000FEC: pushenv 0x20C87C8
00000FF0: call action_kill_object(argc=0)
00000FF8: popz
00000FFC: popenv 0x40C87BC
00001000: push.imm.e 389
00001004: pushenv 0x20C87E0
00001008: call action_kill_object(argc=0)
00001010: popz
00001014: popenv 0x40C87D4
00001018: push.imm.e 390
0000101C: pushenv 0x20C87F8
00001020: call action_kill_object(argc=0)
00001028: popz
0000102C: popenv 0x40C87EC
00001030: push.imm.e 391
00001034: pushenv 0x20C8810
00001038: call action_kill_object(argc=0)
00001040: popz
00001044: popenv 0x40C8804
00001048: push.imm.e 392
0000104C: pushenv 0x20C8828
00001050: call action_kill_object(argc=0)
00001058: popz
0000105C: popenv 0x40C881C
00001060: push.imm.e 393
00001064: pushenv 0x20C8840
00001068: call action_kill_object(argc=0)
00001070: popz
00001074: popenv 0x40C8834
00001078: push.imm.e 394
0000107C: pushenv 0x20C8858
00001080: call action_kill_object(argc=0)
00001088: popz
0000108C: popenv 0x40C884C
00001090: push.imm.e 395
00001094: pushenv 0x20C8870
00001098: call action_kill_object(argc=0)
000010A0: popz
000010A4: popenv 0x40C8864
000010A8: push.imm.e 396
000010AC: pushenv 0x20C8888
000010B0: call action_kill_object(argc=0)
000010B8: popz
000010BC: popenv 0x40C887C
000010C0: push.imm.e 397
000010C4: pushenv 0x20C88A0
000010C8: call action_kill_object(argc=0)
000010D0: popz
000010D4: popenv 0x40C8894
000010D8: push.imm.e 398
000010DC: pushenv 0x20C88B8
000010E0: call action_kill_object(argc=0)
000010E8: popz
000010EC: popenv 0x40C88AC
000010F0: push.imm.e 399
000010F4: pushenv 0x20C88D0
000010F8: call action_kill_object(argc=0)
00001100: popz
00001104: popenv 0x40C88C4
00001108: push.imm.e 400
0000110C: pushenv 0x20C88E8
00001110: call action_kill_object(argc=0)
00001118: popz
0000111C: popenv 0x40C88DC
00001120: push.imm.e 401
00001124: pushenv 0x20C8900
00001128: call action_kill_object(argc=0)
00001130: popz
00001134: popenv 0x40C88F4
00001138: push.imm.e 402
0000113C: pushenv 0x20C8918
00001140: call action_kill_object(argc=0)
00001148: popz
0000114C: popenv 0x40C890C
00001150: push.imm.e 403
00001154: pushenv 0x20C8930
00001158: call action_kill_object(argc=0)
00001160: popz
00001164: popenv 0x40C8924
00001168: push.imm.e 404
0000116C: pushenv 0x20C8948
00001170: call action_kill_object(argc=0)
00001178: popz
0000117C: popenv 0x40C893C
00001180: push.imm.e 405
00001184: pushenv 0x20C8960
00001188: call action_kill_object(argc=0)
00001190: popz
00001194: popenv 0x40C8954
00001198: push.imm.e 406
0000119C: pushenv 0x20C8978
000011A0: call action_kill_object(argc=0)
000011A8: popz
000011AC: popenv 0x40C896C
000011B0: push.imm.e 407
000011B4: pushenv 0x20C8990
000011B8: call action_kill_object(argc=0)
000011C0: popz
000011C4: popenv 0x40C8984
000011C8: push.imm.e 408
000011CC: pushenv 0x20C89A8
000011D0: call action_kill_object(argc=0)
000011D8: popz
000011DC: popenv 0x40C899C
000011E0: push.imm.e 409
000011E4: pushenv 0x20C89C0
000011E8: call action_kill_object(argc=0)
000011F0: popz
000011F4: popenv 0x40C89B4
000011F8: push.imm.e 410
000011FC: pushenv 0x20C89D8
00001200: call action_kill_object(argc=0)
00001208: popz
0000120C: popenv 0x40C89CC
00001210: push.imm.e 411
00001214: pushenv 0x20C89F0
00001218: call action_kill_object(argc=0)
00001220: popz
00001224: popenv 0x40C89E4
00001228: push.imm.e 410
0000122C: pushenv 0x20C8A08
00001230: call action_kill_object(argc=0)
00001238: popz
0000123C: popenv 0x40C89FC
00001240: push.imm.e 412
00001244: pushenv 0x20C8A20
00001248: call action_kill_object(argc=0)
00001250: popz
00001254: popenv 0x40C8A14
00001258: push.imm.e 413
0000125C: pushenv 0x20C8A38
00001260: call action_kill_object(argc=0)
00001268: popz
0000126C: popenv 0x40C8A2C
00001270: push.imm.e 414
00001274: pushenv 0x20C8A50
00001278: call action_kill_object(argc=0)
00001280: popz
00001284: popenv 0x40C8A44
00001288: push.imm.e 415
0000128C: pushenv 0x20C8A68
00001290: call action_kill_object(argc=0)
00001298: popz
0000129C: popenv 0x40C8A5C
000012A0: push.imm.e 416
000012A4: pushenv 0x20C8A80
000012A8: call action_kill_object(argc=0)
000012B0: popz
000012B4: popenv 0x40C8A74
000012B8: push.imm.e 417
000012BC: pushenv 0x20C8A98
000012C0: call action_kill_object(argc=0)
000012C8: popz
000012CC: popenv 0x40C8A8C
000012D0: push.imm.e 418
000012D4: pushenv 0x20C8AB0
000012D8: call action_kill_object(argc=0)
000012E0: popz
000012E4: popenv 0x40C8AA4
000012E8: push.imm.e 419
000012EC: pushenv 0x20C8AC8
000012F0: call action_kill_object(argc=0)
000012F8: popz
000012FC: popenv 0x40C8ABC
00001300: push.imm.e 420
00001304: pushenv 0x20C8AE0
00001308: call action_kill_object(argc=0)
00001310: popz
00001314: popenv 0x40C8AD4
00001318: push.imm.e 421
0000131C: pushenv 0x20C8AF8
00001320: call action_kill_object(argc=0)
00001328: popz
0000132C: popenv 0x40C8AEC
00001330: push.imm.e 422
00001334: pushenv 0x20C8B10
00001338: call action_kill_object(argc=0)
00001340: popz
00001344: popenv 0x40C8B04
00001348: push.imm.e 423
0000134C: pushenv 0x20C8B28
00001350: call action_kill_object(argc=0)
00001358: popz
0000135C: popenv 0x40C8B1C
00001360: push.imm.e 424
00001364: pushenv 0x20C8B40
00001368: call action_kill_object(argc=0)
00001370: popz
00001374: popenv 0x40C8B34
00001378: push.imm.e 425
0000137C: pushenv 0x20C8B58
00001380: call action_kill_object(argc=0)
00001388: popz
0000138C: popenv 0x40C8B4C
00001390: push.imm.e 426
00001394: pushenv 0x20C8B70
00001398: call action_kill_object(argc=0)
000013A0: popz
000013A4: popenv 0x40C8B64
000013A8: push.imm.e 285
000013AC: pushenv 0x20C8B88
000013B0: call action_kill_object(argc=0)
000013B8: popz
000013BC: popenv 0x40C8B7C
000013C0: push.imm.e 284
000013C4: pushenv 0x20C8BA0
000013C8: call action_kill_object(argc=0)
000013D0: popz
000013D4: popenv 0x40C8B94
000013D8: push.imm.e 283
000013DC: pushenv 0x20C8BB8
000013E0: call action_kill_object(argc=0)
000013E8: popz
000013EC: popenv 0x40C8BAC
000013F0: push.imm.e 282
000013F4: pushenv 0x20C8BD0
000013F8: call action_kill_object(argc=0)
00001400: popz
00001404: popenv 0x40C8BC4
00001408: push.imm.e 281
0000140C: pushenv 0x20C8BE8
00001410: call action_kill_object(argc=0)
00001418: popz
0000141C: popenv 0x40C8BDC
00001420: push.imm.e 280
00001424: pushenv 0x20C8C00
00001428: call action_kill_object(argc=0)
00001430: popz
00001434: popenv 0x40C8BF4
00001438: push.imm.e 279
0000143C: pushenv 0x20C8C18
00001440: call action_kill_object(argc=0)
00001448: popz
0000144C: popenv 0x40C8C0C
00001450: push.imm.e 278
00001454: pushenv 0x20C8C30
00001458: call action_kill_object(argc=0)
00001460: popz
00001464: popenv 0x40C8C24
00001468: push.imm.e 277
0000146C: pushenv 0x20C8C48
00001470: call action_kill_object(argc=0)
00001478: popz
0000147C: popenv 0x40C8C3C
00001480: push.imm.e 276
00001484: pushenv 0x20C8C60
00001488: call action_kill_object(argc=0)
00001490: popz
00001494: popenv 0x40C8C54
00001498: push.imm.e 275
0000149C: pushenv 0x20C8C78
000014A0: call action_kill_object(argc=0)
000014A8: popz
000014AC: popenv 0x40C8C6C
000014B0: push.imm.e 274
000014B4: pushenv 0x20C8C90
000014B8: call action_kill_object(argc=0)
000014C0: popz
000014C4: popenv 0x40C8C84
000014C8: push.imm.e 273
000014CC: pushenv 0x20C8CA8
000014D0: call action_kill_object(argc=0)
000014D8: popz
000014DC: popenv 0x40C8C9C
000014E0: push.imm.e 272
000014E4: pushenv 0x20C8CC0
000014E8: call action_kill_object(argc=0)
000014F0: popz
000014F4: popenv 0x40C8CB4
000014F8: push.imm.e 271
000014FC: pushenv 0x20C8CD8
00001500: call action_kill_object(argc=0)
00001508: popz
0000150C: popenv 0x40C8CCC
00001510: push.imm.e 270
00001514: pushenv 0x20C8CF0
00001518: call action_kill_object(argc=0)
00001520: popz
00001524: popenv 0x40C8CE4
00001528: push.imm.e 269
0000152C: pushenv 0x20C8D08
00001530: call action_kill_object(argc=0)
00001538: popz
0000153C: popenv 0x40C8CFC
00001540: push.imm.e 268
00001544: pushenv 0x20C8D20
00001548: call action_kill_object(argc=0)
00001550: popz
00001554: popenv 0x40C8D14
00001558: push.imm.e 267
0000155C: pushenv 0x20C8D38
00001560: call action_kill_object(argc=0)
00001568: popz
0000156C: popenv 0x40C8D2C
00001570: push.imm.e 266
00001574: pushenv 0x20C8D50
00001578: call action_kill_object(argc=0)
00001580: popz
00001584: popenv 0x40C8D44
00001588: push.imm.e 264
0000158C: pushenv 0x20C8D68
00001590: call action_kill_object(argc=0)
00001598: popz
0000159C: popenv 0x40C8D5C
000015A0: push.imm.e 263
000015A4: pushenv 0x20C8D80
000015A8: call action_kill_object(argc=0)
000015B0: popz
000015B4: popenv 0x40C8D74
000015B8: push.imm.e 234
000015BC: pushenv 0x20C8D98
000015C0: call action_kill_object(argc=0)
000015C8: popz
000015CC: popenv 0x40C8D8C
000015D0: push.imm.e 232
000015D4: pushenv 0x20C8DB0
000015D8: call action_kill_object(argc=0)
000015E0: popz
000015E4: popenv 0x40C8DA4
000015E8: push.imm.e 230
000015EC: pushenv 0x20C8DC8
000015F0: call action_kill_object(argc=0)
000015F8: popz
000015FC: popenv 0x40C8DBC
00001600: push.imm.e 228
00001604: pushenv 0x20C8DE0
00001608: call action_kill_object(argc=0)
00001610: popz
00001614: popenv 0x40C8DD4
00001618: push.imm.e 227
0000161C: pushenv 0x20C8DF8
00001620: call action_kill_object(argc=0)
00001628: popz
0000162C: popenv 0x40C8DEC
00001630: push.imm.e 225
00001634: pushenv 0x20C8E10
00001638: call action_kill_object(argc=0)
00001640: popz
00001644: popenv 0x40C8E04
00001648: push.imm.e 223
0000164C: pushenv 0x20C8E28
00001650: call action_kill_object(argc=0)
00001658: popz
0000165C: popenv 0x40C8E1C
00001660: push.imm.e 221
00001664: pushenv 0x20C8E40
00001668: call action_kill_object(argc=0)
00001670: popz
00001674: popenv 0x40C8E34
00001678: push.imm.e 220
0000167C: pushenv 0x20C8E58
00001680: call action_kill_object(argc=0)
00001688: popz
0000168C: popenv 0x40C8E4C
00001690: push.imm.e 219
00001694: pushenv 0x20C8E70
00001698: call action_kill_object(argc=0)
000016A0: popz
000016A4: popenv 0x40C8E64
000016A8: push.imm.e 217
000016AC: pushenv 0x20C8E88
000016B0: call action_kill_object(argc=0)
000016B8: popz
000016BC: popenv 0x40C8E7C
000016C0: push.imm.e 216
000016C4: pushenv 0x20C8EA0
000016C8: call action_kill_object(argc=0)
000016D0: popz
000016D4: popenv 0x40C8E94
000016D8: push.imm.e 218
000016DC: pushenv 0x20C8EB8
000016E0: call action_kill_object(argc=0)
000016E8: popz
000016EC: popenv 0x40C8EAC
000016F0: push.imm.e 215
000016F4: pushenv 0x20C8ED0
000016F8: call action_kill_object(argc=0)
00001700: popz
00001704: popenv 0x40C8EC4
00001708: push.imm.e 214
0000170C: pushenv 0x20C8EE8
00001710: call action_kill_object(argc=0)
00001718: popz
0000171C: popenv 0x40C8EDC
00001720: push.imm.e 213
00001724: pushenv 0x20C8F00
00001728: call action_kill_object(argc=0)
00001730: popz
00001734: popenv 0x40C8EF4
00001738: push.imm.e 211
0000173C: pushenv 0x20C8F18
00001740: call action_kill_object(argc=0)
00001748: popz
0000174C: popenv 0x40C8F0C
00001750: push.imm.e 60
00001754: pushenv 0x20C8F30
00001758: call action_kill_object(argc=0)
00001760: popz
00001764: popenv 0x40C8F24
00001768: push.imm.e 59
0000176C: pushenv 0x20C8F48
00001770: call action_kill_object(argc=0)
00001778: popz
0000177C: popenv 0x40C8F3C
00001780: push.imm.e 58
00001784: pushenv 0x20C8F60
00001788: call action_kill_object(argc=0)
00001790: popz
00001794: popenv 0x40C8F54
00001798: push.imm.e 47
0000179C: pushenv 0x20C8F78
000017A0: call action_kill_object(argc=0)
000017A8: popz
000017AC: popenv 0x40C8F6C
000017B0: push.imm.e 46
000017B4: pushenv 0x20C8F90
000017B8: call action_kill_object(argc=0)
000017C0: popz
000017C4: popenv 0x40C8F84
000017C8: push.imm.e 33
000017CC: pushenv 0x20C8FA8
000017D0: call action_kill_object(argc=0)
000017D8: popz
000017DC: popenv 0x40C8F9C
000017E0: push.imm.e 29
000017E4: pushenv 0x20C8FC0
000017E8: call action_kill_object(argc=0)
000017F0: popz
000017F4: popenv 0x40C8FB4
000017F8: push.imm.e 27
000017FC: pushenv 0x20C8FD8
00001800: call action_kill_object(argc=0)
00001808: popz
0000180C: popenv 0x40C8FCC
00001810: push.imm.e 24
00001814: pushenv 0x20C8FF0
00001818: call action_kill_object(argc=0)
00001820: popz
00001824: popenv 0x40C8FE4
00001828: push.imm.e 125
0000182C: pushenv 0x20C9008
00001830: call action_kill_object(argc=0)
00001838: popz
0000183C: popenv 0x40C8FFC
00001840: push.imm.e 13
00001844: pushenv 0x20C9020
00001848: call action_kill_object(argc=0)
00001850: popz
00001854: popenv 0x40C9014
00001858: push.imm.e 14
0000185C: pushenv 0x20C9050
00001860: push.d 0.04
0000186C: conv.d.v
00001870: push.imm.e 270
00001874: conv.i.v
00001878: call action_set_gravity(argc=2)
00001880: popz
00001884: popenv 0x40C902C
00001888: push.imm.e 176
0000188C: pushenv 0x20C9080
00001890: push.d 0.04
0000189C: conv.d.v
000018A0: push.imm.e 270
000018A4: conv.i.v
000018A8: call action_set_gravity(argc=2)
000018B0: popz
000018B4: popenv 0x40C905C
000018B8: push.imm.e 156
000018BC: pushenv 0x20C90B0
000018C0: push.d 0.04
000018CC: conv.d.v
000018D0: push.imm.e 270
000018D4: conv.i.v
000018D8: call action_set_gravity(argc=2)
000018E0: popz
000018E4: popenv 0x40C908C
000018E8: push.imm.e 176
000018EC: pushenv 0x20C90E0
000018F0: push.d 0.04
000018FC: conv.d.v
00001900: push.imm.e 270
00001904: conv.i.v
00001908: call action_set_gravity(argc=2)
00001910: popz
00001914: popenv 0x40C90BC
00001918: push.imm.e 17
0000191C: pushenv 0x20C9110
00001920: push.d 0.04
0000192C: conv.d.v
00001930: push.imm.e 270
00001934: conv.i.v
00001938: call action_set_gravity(argc=2)
00001940: popz
00001944: popenv 0x40C90EC
00001948: push.imm.e 0
0000194C: conv.i.v
00001950: call action_set_relative(argc=1)
00001958: popz
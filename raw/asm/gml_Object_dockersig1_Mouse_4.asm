// gml_Object_dockersig1_Mouse_4  locals=2 args=0 len=2628
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: push.builtin.v os_type
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20BA238
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v phase
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B9DAC
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 650
00000098: conv.i.v
0000009C: call action_create_object(argc=3)
000000A4: popz
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: call action_set_relative(argc=1)
000000B8: popz
000000BC: push.imm.e 1
000000C0: pop.v.i phase
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: b 0x20BA238
000000E0: push.imm.e 156
000000E4: pushenv 0x20B9DF0
000000E8: push.imm.e 4
000000EC: conv.i.v
000000F0: push.imm.e 5000
000000F4: conv.i.v
000000F8: push.v mon
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20B9DF0
00000120: b 0x20B9DF8
00000124: popenv 0x40B9DB4
00000128: b 0x20B9DFC
0000012C: popenv 0x1CB9DF8
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x20BA238
00000140: push.imm.e 156
00000144: pushenv 0x20B9E50
00000148: push.imm.e 4
0000014C: conv.i.v
00000150: push.imm.e 9000
00000154: conv.i.v
00000158: push.v oil
00000160: call action_if_variable(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x20B9E50
00000180: b 0x20B9E58
00000184: popenv 0x40B9E14
00000188: b 0x20B9E5C
0000018C: popenv 0x1CB9E58
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20BA238
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.imm.e 1
000001B8: pop.v.i active
000001C0: push.imm.e 1
000001C4: conv.i.v
000001C8: call action_set_relative(argc=1)
000001D0: popz
000001D4: push.imm.e 1
000001D8: conv.i.v
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 518
000001E8: conv.i.v
000001EC: call action_sprite_set(argc=3)
000001F4: popz
000001F8: push.imm.e 107
000001FC: pushenv 0x20B9ED8
00000200: call action_kill_object(argc=0)
00000208: popz
0000020C: popenv 0x40B9ECC
00000210: push.imm.e 0
00000214: conv.i.v
00000218: call action_set_relative(argc=1)
00000220: popz
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: push.imm.e 40
00000230: conv.i.v
00000234: call action_set_alarm(argc=2)
0000023C: popz
00000240: push.imm.e 1
00000244: conv.i.v
00000248: call action_set_relative(argc=1)
00000250: popz
00000254: push.imm.e 0
00000258: conv.i.v
0000025C: call action_set_relative(argc=1)
00000264: popz
00000268: push.imm.e 1
0000026C: conv.i.v
00000270: push.imm.e 80
00000274: conv.i.v
00000278: call action_set_alarm(argc=2)
00000280: popz
00000284: push.imm.e 1
00000288: conv.i.v
0000028C: call action_set_relative(argc=1)
00000294: popz
00000298: push.imm.e 0
0000029C: conv.i.v
000002A0: call action_set_relative(argc=1)
000002A8: popz
000002AC: push.imm.e 2
000002B0: conv.i.v
000002B4: push.imm.e 120
000002B8: conv.i.v
000002BC: call action_set_alarm(argc=2)
000002C4: popz
000002C8: push.imm.e 1
000002CC: conv.i.v
000002D0: call action_set_relative(argc=1)
000002D8: popz
000002DC: push.imm.e 0
000002E0: conv.i.v
000002E4: call action_set_relative(argc=1)
000002EC: popz
000002F0: push.imm.e 3
000002F4: conv.i.v
000002F8: push.imm.e 160
000002FC: conv.i.v
00000300: call action_set_alarm(argc=2)
00000308: popz
0000030C: push.imm.e 1
00000310: conv.i.v
00000314: call action_set_relative(argc=1)
0000031C: popz
00000320: push.imm.e 0
00000324: conv.i.v
00000328: call action_set_relative(argc=1)
00000330: popz
00000334: push.imm.e 5
00000338: conv.i.v
0000033C: push.imm.e 200
00000340: conv.i.v
00000344: call action_set_alarm(argc=2)
0000034C: popz
00000350: push.imm.e 1
00000354: conv.i.v
00000358: call action_set_relative(argc=1)
00000360: popz
00000364: push.imm.e 0
00000368: conv.i.v
0000036C: call action_set_relative(argc=1)
00000374: popz
00000378: push.imm.e 4
0000037C: conv.i.v
00000380: push.imm.e 840
00000384: conv.i.v
00000388: call action_set_alarm(argc=2)
00000390: popz
00000394: push.imm.e 1
00000398: conv.i.v
0000039C: call action_set_relative(argc=1)
000003A4: popz
000003A8: push.imm.e 0
000003AC: conv.i.v
000003B0: call action_set_relative(argc=1)
000003B8: popz
000003BC: push.imm.e -1000
000003C0: conv.i.v
000003C4: push.imm.e 5000
000003C8: conv.i.v
000003CC: push.imm.e 119
000003D0: conv.i.v
000003D4: call action_create_object(argc=3)
000003DC: popz
000003E0: push.imm.e 1
000003E4: conv.i.v
000003E8: call action_set_relative(argc=1)
000003F0: popz
000003F4: push.imm.e 0
000003F8: conv.i.v
000003FC: call action_set_relative(argc=1)
00000404: popz
00000408: push.imm.e 0
0000040C: conv.i.v
00000410: push.imm.e 5000
00000414: conv.i.v
00000418: push.imm.e 119
0000041C: conv.i.v
00000420: call action_create_object(argc=3)
00000428: popz
0000042C: push.imm.e 1
00000430: conv.i.v
00000434: call action_set_relative(argc=1)
0000043C: popz
00000440: push.imm.e 0
00000444: conv.i.v
00000448: call action_set_relative(argc=1)
00000450: popz
00000454: push.imm.e 1000
00000458: conv.i.v
0000045C: push.imm.e 5000
00000460: conv.i.v
00000464: push.imm.e 119
00000468: conv.i.v
0000046C: call action_create_object(argc=3)
00000474: popz
00000478: push.imm.e 1
0000047C: conv.i.v
00000480: call action_set_relative(argc=1)
00000488: popz
0000048C: push.imm.e 0
00000490: conv.i.v
00000494: call action_set_relative(argc=1)
0000049C: popz
000004A0: push.imm.e 2000
000004A4: conv.i.v
000004A8: push.imm.e 5000
000004AC: conv.i.v
000004B0: push.imm.e 119
000004B4: conv.i.v
000004B8: call action_create_object(argc=3)
000004C0: popz
000004C4: push.imm.e 1
000004C8: conv.i.v
000004CC: call action_set_relative(argc=1)
000004D4: popz
000004D8: push.imm.e 0
000004DC: conv.i.v
000004E0: call action_set_relative(argc=1)
000004E8: popz
000004EC: push.imm.e 3000
000004F0: conv.i.v
000004F4: push.imm.e 5000
000004F8: conv.i.v
000004FC: push.imm.e 119
00000500: conv.i.v
00000504: call action_create_object(argc=3)
0000050C: popz
00000510: push.imm.e 1
00000514: conv.i.v
00000518: call action_set_relative(argc=1)
00000520: popz
00000524: push.imm.e 156
00000528: pushenv 0x20BA210
0000052C: push.v mon
00000534: push.imm.e -5000
00000538: add.i.v
0000053C: pop.v.v mon
00000544: popenv 0x40BA1F8
00000548: push.imm.e 156
0000054C: pushenv 0x20BA234
00000550: push.v oil
00000558: push.imm.e -9000
0000055C: add.i.v
00000560: pop.v.v oil
00000568: popenv 0x40BA21C
0000056C: push.imm.e 0
00000570: conv.i.v
00000574: push.imm.e 0
00000578: conv.i.v
0000057C: push.builtin.v os_type
00000584: call action_if_variable(argc=3)
0000058C: pop.v.v local.__b__
00000594: push.local.v local.__b__
0000059C: conv.v.b
000005A0: bf 0x20BA6FC
000005A4: push.imm.e 156
000005A8: pushenv 0x20BA2B4
000005AC: push.imm.e 4
000005B0: conv.i.v
000005B4: push.imm.e 5000
000005B8: conv.i.v
000005BC: push.v mon
000005C4: call action_if_variable(argc=3)
000005CC: pop.v.v local.__b__
000005D4: push.local.v local.__b__
000005DC: conv.v.b
000005E0: bf 0x20BA2B4
000005E4: b 0x20BA2BC
000005E8: popenv 0x40BA278
000005EC: b 0x20BA2C0
000005F0: popenv 0x1CBA2BC
000005F4: push.local.v local.__b__
000005FC: conv.v.b
00000600: bf 0x20BA6FC
00000604: push.imm.e 156
00000608: pushenv 0x20BA314
0000060C: push.imm.e 4
00000610: conv.i.v
00000614: push.imm.e 9000
00000618: conv.i.v
0000061C: push.v oil
00000624: call action_if_variable(argc=3)
0000062C: pop.v.v local.__b__
00000634: push.local.v local.__b__
0000063C: conv.v.b
00000640: bf 0x20BA314
00000644: b 0x20BA31C
00000648: popenv 0x40BA2D8
0000064C: b 0x20BA320
00000650: popenv 0x1CBA31C
00000654: push.local.v local.__b__
0000065C: conv.v.b
00000660: bf 0x20BA6FC
00000664: push.imm.e 0
00000668: conv.i.v
0000066C: call action_set_relative(argc=1)
00000674: popz
00000678: push.imm.e 1
0000067C: pop.v.i active
00000684: push.imm.e 1
00000688: conv.i.v
0000068C: call action_set_relative(argc=1)
00000694: popz
00000698: push.imm.e 1
0000069C: conv.i.v
000006A0: push.imm.e 0
000006A4: conv.i.v
000006A8: push.imm.e 518
000006AC: conv.i.v
000006B0: call action_sprite_set(argc=3)
000006B8: popz
000006BC: push.imm.e 107
000006C0: pushenv 0x20BA39C
000006C4: call action_kill_object(argc=0)
000006CC: popz
000006D0: popenv 0x40BA390
000006D4: push.imm.e 0
000006D8: conv.i.v
000006DC: call action_set_relative(argc=1)
000006E4: popz
000006E8: push.imm.e 0
000006EC: conv.i.v
000006F0: push.imm.e 40
000006F4: conv.i.v
000006F8: call action_set_alarm(argc=2)
00000700: popz
00000704: push.imm.e 1
00000708: conv.i.v
0000070C: call action_set_relative(argc=1)
00000714: popz
00000718: push.imm.e 0
0000071C: conv.i.v
00000720: call action_set_relative(argc=1)
00000728: popz
0000072C: push.imm.e 1
00000730: conv.i.v
00000734: push.imm.e 80
00000738: conv.i.v
0000073C: call action_set_alarm(argc=2)
00000744: popz
00000748: push.imm.e 1
0000074C: conv.i.v
00000750: call action_set_relative(argc=1)
00000758: popz
0000075C: push.imm.e 0
00000760: conv.i.v
00000764: call action_set_relative(argc=1)
0000076C: popz
00000770: push.imm.e 2
00000774: conv.i.v
00000778: push.imm.e 120
0000077C: conv.i.v
00000780: call action_set_alarm(argc=2)
00000788: popz
0000078C: push.imm.e 1
00000790: conv.i.v
00000794: call action_set_relative(argc=1)
0000079C: popz
000007A0: push.imm.e 0
000007A4: conv.i.v
000007A8: call action_set_relative(argc=1)
000007B0: popz
000007B4: push.imm.e 3
000007B8: conv.i.v
000007BC: push.imm.e 160
000007C0: conv.i.v
000007C4: call action_set_alarm(argc=2)
000007CC: popz
000007D0: push.imm.e 1
000007D4: conv.i.v
000007D8: call action_set_relative(argc=1)
000007E0: popz
000007E4: push.imm.e 0
000007E8: conv.i.v
000007EC: call action_set_relative(argc=1)
000007F4: popz
000007F8: push.imm.e 5
000007FC: conv.i.v
00000800: push.imm.e 200
00000804: conv.i.v
00000808: call action_set_alarm(argc=2)
00000810: popz
00000814: push.imm.e 1
00000818: conv.i.v
0000081C: call action_set_relative(argc=1)
00000824: popz
00000828: push.imm.e 0
0000082C: conv.i.v
00000830: call action_set_relative(argc=1)
00000838: popz
0000083C: push.imm.e 4
00000840: conv.i.v
00000844: push.imm.e 840
00000848: conv.i.v
0000084C: call action_set_alarm(argc=2)
00000854: popz
00000858: push.imm.e 1
0000085C: conv.i.v
00000860: call action_set_relative(argc=1)
00000868: popz
0000086C: push.imm.e 0
00000870: conv.i.v
00000874: call action_set_relative(argc=1)
0000087C: popz
00000880: push.imm.e -1000
00000884: conv.i.v
00000888: push.imm.e 5000
0000088C: conv.i.v
00000890: push.imm.e 119
00000894: conv.i.v
00000898: call action_create_object(argc=3)
000008A0: popz
000008A4: push.imm.e 1
000008A8: conv.i.v
000008AC: call action_set_relative(argc=1)
000008B4: popz
000008B8: push.imm.e 0
000008BC: conv.i.v
000008C0: call action_set_relative(argc=1)
000008C8: popz
000008CC: push.imm.e 0
000008D0: conv.i.v
000008D4: push.imm.e 5000
000008D8: conv.i.v
000008DC: push.imm.e 119
000008E0: conv.i.v
000008E4: call action_create_object(argc=3)
000008EC: popz
000008F0: push.imm.e 1
000008F4: conv.i.v
000008F8: call action_set_relative(argc=1)
00000900: popz
00000904: push.imm.e 0
00000908: conv.i.v
0000090C: call action_set_relative(argc=1)
00000914: popz
00000918: push.imm.e 1000
0000091C: conv.i.v
00000920: push.imm.e 5000
00000924: conv.i.v
00000928: push.imm.e 119
0000092C: conv.i.v
00000930: call action_create_object(argc=3)
00000938: popz
0000093C: push.imm.e 1
00000940: conv.i.v
00000944: call action_set_relative(argc=1)
0000094C: popz
00000950: push.imm.e 0
00000954: conv.i.v
00000958: call action_set_relative(argc=1)
00000960: popz
00000964: push.imm.e 2000
00000968: conv.i.v
0000096C: push.imm.e 5000
00000970: conv.i.v
00000974: push.imm.e 119
00000978: conv.i.v
0000097C: call action_create_object(argc=3)
00000984: popz
00000988: push.imm.e 1
0000098C: conv.i.v
00000990: call action_set_relative(argc=1)
00000998: popz
0000099C: push.imm.e 0
000009A0: conv.i.v
000009A4: call action_set_relative(argc=1)
000009AC: popz
000009B0: push.imm.e 3000
000009B4: conv.i.v
000009B8: push.imm.e 5000
000009BC: conv.i.v
000009C0: push.imm.e 119
000009C4: conv.i.v
000009C8: call action_create_object(argc=3)
000009D0: popz
000009D4: push.imm.e 1
000009D8: conv.i.v
000009DC: call action_set_relative(argc=1)
000009E4: popz
000009E8: push.imm.e 156
000009EC: pushenv 0x20BA6D4
000009F0: push.v mon
000009F8: push.imm.e -5000
000009FC: add.i.v
00000A00: pop.v.v mon
00000A08: popenv 0x40BA6BC
00000A0C: push.imm.e 156
00000A10: pushenv 0x20BA6F8
00000A14: push.v oil
00000A1C: push.imm.e -9000
00000A20: add.i.v
00000A24: pop.v.v oil
00000A2C: popenv 0x40BA6E0
00000A30: push.imm.e 0
00000A34: conv.i.v
00000A38: call action_set_relative(argc=1)
00000A40: popz
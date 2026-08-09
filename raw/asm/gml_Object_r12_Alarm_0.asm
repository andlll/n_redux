// gml_Object_r12_Alarm_0  locals=2 args=0 len=2928
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 140
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 12
00000020: conv.i.v
00000024: call action_if_dice(argc=1)
0000002C: pop.v.v local.__b__
00000034: push.local.v local.__b__
0000003C: conv.v.b
00000040: bf 0x20C6C6C
00000044: push.imm.e 2500
00000048: conv.i.v
0000004C: push.imm.e 3000
00000050: conv.i.v
00000054: push.imm.e -3000
00000058: conv.i.v
0000005C: call random_range(argc=2)
00000064: push.imm.e 100
00000068: conv.i.v
0000006C: call action_create_object(argc=3)
00000074: popz
00000078: push.imm.e 36
0000007C: conv.i.v
00000080: call action_if_dice(argc=1)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x20C6CC8
000000A0: push.imm.e 2500
000000A4: conv.i.v
000000A8: push.imm.e 3000
000000AC: conv.i.v
000000B0: push.imm.e -3000
000000B4: conv.i.v
000000B8: call random_range(argc=2)
000000C0: push.imm.e 99
000000C4: conv.i.v
000000C8: call action_create_object(argc=3)
000000D0: popz
000000D4: push.imm.e 2
000000D8: conv.i.v
000000DC: push.imm.e 0
000000E0: conv.i.v
000000E4: push.imm.e 161
000000E8: conv.i.v
000000EC: call action_if_number(argc=3)
000000F4: pop.v.v local.__b__
000000FC: push.local.v local.__b__
00000104: conv.v.b
00000108: bf 0x20C7098
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 1
00000118: conv.i.v
0000011C: push.v storm
00000124: call action_if_variable(argc=3)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x20C7098
00000144: push.imm.e -140
00000148: conv.i.v
0000014C: push.imm.e 2000
00000150: conv.i.v
00000154: push.imm.e 461
00000158: conv.i.v
0000015C: call action_create_object(argc=3)
00000164: popz
00000168: push.imm.e -120
0000016C: conv.i.v
00000170: push.imm.e 2174
00000174: conv.i.v
00000178: push.imm.e 461
0000017C: conv.i.v
00000180: call action_create_object(argc=3)
00000188: popz
0000018C: push.imm.e -150
00000190: conv.i.v
00000194: push.imm.e 2374
00000198: conv.i.v
0000019C: push.imm.e 461
000001A0: conv.i.v
000001A4: call action_create_object(argc=3)
000001AC: popz
000001B0: push.imm.e -110
000001B4: conv.i.v
000001B8: push.imm.e 2574
000001BC: conv.i.v
000001C0: push.imm.e 461
000001C4: conv.i.v
000001C8: call action_create_object(argc=3)
000001D0: popz
000001D4: push.imm.e -130
000001D8: conv.i.v
000001DC: push.imm.e 2774
000001E0: conv.i.v
000001E4: push.imm.e 461
000001E8: conv.i.v
000001EC: call action_create_object(argc=3)
000001F4: popz
000001F8: push.imm.e -110
000001FC: conv.i.v
00000200: push.imm.e 2974
00000204: conv.i.v
00000208: push.imm.e 461
0000020C: conv.i.v
00000210: call action_create_object(argc=3)
00000218: popz
0000021C: push.imm.e -150
00000220: conv.i.v
00000224: push.imm.e 3174
00000228: conv.i.v
0000022C: push.imm.e 461
00000230: conv.i.v
00000234: call action_create_object(argc=3)
0000023C: popz
00000240: push.imm.e -110
00000244: conv.i.v
00000248: push.imm.e 3344
0000024C: conv.i.v
00000250: push.imm.e 461
00000254: conv.i.v
00000258: call action_create_object(argc=3)
00000260: popz
00000264: push.imm.e -190
00000268: conv.i.v
0000026C: push.imm.e 3544
00000270: conv.i.v
00000274: push.imm.e 461
00000278: conv.i.v
0000027C: call action_create_object(argc=3)
00000284: popz
00000288: push.imm.e -130
0000028C: conv.i.v
00000290: push.imm.e 3744
00000294: conv.i.v
00000298: push.imm.e 461
0000029C: conv.i.v
000002A0: call action_create_object(argc=3)
000002A8: popz
000002AC: push.imm.e -140
000002B0: conv.i.v
000002B4: push.imm.e 3944
000002B8: conv.i.v
000002BC: push.imm.e 461
000002C0: conv.i.v
000002C4: call action_create_object(argc=3)
000002CC: popz
000002D0: push.imm.e -120
000002D4: conv.i.v
000002D8: push.imm.e 4144
000002DC: conv.i.v
000002E0: push.imm.e 461
000002E4: conv.i.v
000002E8: call action_create_object(argc=3)
000002F0: popz
000002F4: push.imm.e 59
000002F8: conv.i.v
000002FC: push.imm.e 4144
00000300: conv.i.v
00000304: push.imm.e 461
00000308: conv.i.v
0000030C: call action_create_object(argc=3)
00000314: popz
00000318: push.imm.e 159
0000031C: conv.i.v
00000320: push.imm.e 4144
00000324: conv.i.v
00000328: push.imm.e 461
0000032C: conv.i.v
00000330: call action_create_object(argc=3)
00000338: popz
0000033C: push.imm.e 259
00000340: conv.i.v
00000344: push.imm.e 4104
00000348: conv.i.v
0000034C: push.imm.e 461
00000350: conv.i.v
00000354: call action_create_object(argc=3)
0000035C: popz
00000360: push.imm.e 359
00000364: conv.i.v
00000368: push.imm.e 4074
0000036C: conv.i.v
00000370: push.imm.e 461
00000374: conv.i.v
00000378: call action_create_object(argc=3)
00000380: popz
00000384: push.imm.e 459
00000388: conv.i.v
0000038C: push.imm.e 4064
00000390: conv.i.v
00000394: push.imm.e 461
00000398: conv.i.v
0000039C: call action_create_object(argc=3)
000003A4: popz
000003A8: push.imm.e 559
000003AC: conv.i.v
000003B0: push.imm.e 4034
000003B4: conv.i.v
000003B8: push.imm.e 461
000003BC: conv.i.v
000003C0: call action_create_object(argc=3)
000003C8: popz
000003CC: push.imm.e 659
000003D0: conv.i.v
000003D4: push.imm.e 4064
000003D8: conv.i.v
000003DC: push.imm.e 461
000003E0: conv.i.v
000003E4: call action_create_object(argc=3)
000003EC: popz
000003F0: push.imm.e 759
000003F4: conv.i.v
000003F8: push.imm.e 4034
000003FC: conv.i.v
00000400: push.imm.e 461
00000404: conv.i.v
00000408: call action_create_object(argc=3)
00000410: popz
00000414: push.imm.e 859
00000418: conv.i.v
0000041C: push.imm.e 4024
00000420: conv.i.v
00000424: push.imm.e 461
00000428: conv.i.v
0000042C: call action_create_object(argc=3)
00000434: popz
00000438: push.imm.e 959
0000043C: conv.i.v
00000440: push.imm.e 4050
00000444: conv.i.v
00000448: push.imm.e 461
0000044C: conv.i.v
00000450: call action_create_object(argc=3)
00000458: popz
0000045C: push.imm.e 1059
00000460: conv.i.v
00000464: push.imm.e 4046
00000468: conv.i.v
0000046C: push.imm.e 461
00000470: conv.i.v
00000474: call action_create_object(argc=3)
0000047C: popz
00000480: push.imm.e 1159
00000484: conv.i.v
00000488: push.imm.e 4036
0000048C: conv.i.v
00000490: push.imm.e 461
00000494: conv.i.v
00000498: call action_create_object(argc=3)
000004A0: popz
000004A4: push.imm.e 0
000004A8: conv.i.v
000004AC: push.imm.e 0
000004B0: conv.i.v
000004B4: push.v storm
000004BC: call action_if_variable(argc=3)
000004C4: pop.v.v local.__b__
000004CC: push.local.v local.__b__
000004D4: conv.v.b
000004D8: bf 0x20C7264
000004DC: push.imm.e 0
000004E0: conv.i.v
000004E4: push.imm.e 0
000004E8: conv.i.v
000004EC: push.v stormeasy
000004F4: call action_if_variable(argc=3)
000004FC: pop.v.v local.__b__
00000504: push.local.v local.__b__
0000050C: conv.v.b
00000510: bf 0x20C7264
00000514: push.imm.e 2
00000518: conv.i.v
0000051C: push.imm.e 0
00000520: conv.i.v
00000524: push.imm.e 736
00000528: conv.i.v
0000052C: call action_if_number(argc=3)
00000534: pop.v.v local.__b__
0000053C: push.local.v local.__b__
00000544: conv.v.b
00000548: bf 0x20C71D4
0000054C: push.imm.e 38
00000550: conv.i.v
00000554: push.imm.e -350
00000558: conv.i.v
0000055C: push.imm.e 458
00000560: conv.i.v
00000564: call action_create_object(argc=3)
0000056C: popz
00000570: push.imm.e 526
00000574: conv.i.v
00000578: push.imm.e -450
0000057C: conv.i.v
00000580: push.imm.e 458
00000584: conv.i.v
00000588: call action_create_object(argc=3)
00000590: popz
00000594: push.imm.e 982
00000598: conv.i.v
0000059C: push.imm.e 470
000005A0: conv.i.v
000005A4: push.imm.e 458
000005A8: conv.i.v
000005AC: call action_create_object(argc=3)
000005B4: popz
000005B8: push.imm.e 1132
000005BC: conv.i.v
000005C0: push.imm.e -210
000005C4: conv.i.v
000005C8: push.imm.e 458
000005CC: conv.i.v
000005D0: call action_create_object(argc=3)
000005D8: popz
000005DC: b 0x20C7264
000005E0: push.imm.e -305
000005E4: conv.i.v
000005E8: push.imm.e 940
000005EC: conv.i.v
000005F0: push.imm.e 460
000005F4: conv.i.v
000005F8: call action_create_object(argc=3)
00000600: popz
00000604: push.imm.e -298
00000608: conv.i.v
0000060C: push.imm.e 1735
00000610: conv.i.v
00000614: push.imm.e 460
00000618: conv.i.v
0000061C: call action_create_object(argc=3)
00000624: popz
00000628: push.imm.e 82
0000062C: conv.i.v
00000630: push.imm.e 2200
00000634: conv.i.v
00000638: push.imm.e 460
0000063C: conv.i.v
00000640: call action_create_object(argc=3)
00000648: popz
0000064C: push.imm.e 700
00000650: conv.i.v
00000654: push.imm.e 2450
00000658: conv.i.v
0000065C: push.imm.e 460
00000660: conv.i.v
00000664: call action_create_object(argc=3)
0000066C: popz
00000670: push.imm.e 0
00000674: conv.i.v
00000678: push.imm.e 1
0000067C: conv.i.v
00000680: push.v storm
00000688: call action_if_variable(argc=3)
00000690: pop.v.v local.__b__
00000698: push.local.v local.__b__
000006A0: conv.v.b
000006A4: bf 0x20C75FC
000006A8: push.imm.e -140
000006AC: conv.i.v
000006B0: push.imm.e -72
000006B4: conv.i.v
000006B8: push.imm.e 461
000006BC: conv.i.v
000006C0: call action_create_object(argc=3)
000006C8: popz
000006CC: push.imm.e -120
000006D0: conv.i.v
000006D4: push.imm.e 174
000006D8: conv.i.v
000006DC: push.imm.e 461
000006E0: conv.i.v
000006E4: call action_create_object(argc=3)
000006EC: popz
000006F0: push.imm.e -150
000006F4: conv.i.v
000006F8: push.imm.e 374
000006FC: conv.i.v
00000700: push.imm.e 461
00000704: conv.i.v
00000708: call action_create_object(argc=3)
00000710: popz
00000714: push.imm.e -110
00000718: conv.i.v
0000071C: push.imm.e 574
00000720: conv.i.v
00000724: push.imm.e 461
00000728: conv.i.v
0000072C: call action_create_object(argc=3)
00000734: popz
00000738: push.imm.e -130
0000073C: conv.i.v
00000740: push.imm.e 774
00000744: conv.i.v
00000748: push.imm.e 461
0000074C: conv.i.v
00000750: call action_create_object(argc=3)
00000758: popz
0000075C: push.imm.e -110
00000760: conv.i.v
00000764: push.imm.e 974
00000768: conv.i.v
0000076C: push.imm.e 461
00000770: conv.i.v
00000774: call action_create_object(argc=3)
0000077C: popz
00000780: push.imm.e -150
00000784: conv.i.v
00000788: push.imm.e 1174
0000078C: conv.i.v
00000790: push.imm.e 461
00000794: conv.i.v
00000798: call action_create_object(argc=3)
000007A0: popz
000007A4: push.imm.e -110
000007A8: conv.i.v
000007AC: push.imm.e 1344
000007B0: conv.i.v
000007B4: push.imm.e 461
000007B8: conv.i.v
000007BC: call action_create_object(argc=3)
000007C4: popz
000007C8: push.imm.e -190
000007CC: conv.i.v
000007D0: push.imm.e 1544
000007D4: conv.i.v
000007D8: push.imm.e 461
000007DC: conv.i.v
000007E0: call action_create_object(argc=3)
000007E8: popz
000007EC: push.imm.e -130
000007F0: conv.i.v
000007F4: push.imm.e 1744
000007F8: conv.i.v
000007FC: push.imm.e 461
00000800: conv.i.v
00000804: call action_create_object(argc=3)
0000080C: popz
00000810: push.imm.e -140
00000814: conv.i.v
00000818: push.imm.e 1944
0000081C: conv.i.v
00000820: push.imm.e 461
00000824: conv.i.v
00000828: call action_create_object(argc=3)
00000830: popz
00000834: push.imm.e -120
00000838: conv.i.v
0000083C: push.imm.e 2144
00000840: conv.i.v
00000844: push.imm.e 461
00000848: conv.i.v
0000084C: call action_create_object(argc=3)
00000854: popz
00000858: push.imm.e 59
0000085C: conv.i.v
00000860: push.imm.e 2144
00000864: conv.i.v
00000868: push.imm.e 461
0000086C: conv.i.v
00000870: call action_create_object(argc=3)
00000878: popz
0000087C: push.imm.e 159
00000880: conv.i.v
00000884: push.imm.e 2144
00000888: conv.i.v
0000088C: push.imm.e 461
00000890: conv.i.v
00000894: call action_create_object(argc=3)
0000089C: popz
000008A0: push.imm.e 259
000008A4: conv.i.v
000008A8: push.imm.e 2104
000008AC: conv.i.v
000008B0: push.imm.e 461
000008B4: conv.i.v
000008B8: call action_create_object(argc=3)
000008C0: popz
000008C4: push.imm.e 359
000008C8: conv.i.v
000008CC: push.imm.e 2074
000008D0: conv.i.v
000008D4: push.imm.e 461
000008D8: conv.i.v
000008DC: call action_create_object(argc=3)
000008E4: popz
000008E8: push.imm.e 459
000008EC: conv.i.v
000008F0: push.imm.e 2064
000008F4: conv.i.v
000008F8: push.imm.e 461
000008FC: conv.i.v
00000900: call action_create_object(argc=3)
00000908: popz
0000090C: push.imm.e 559
00000910: conv.i.v
00000914: push.imm.e 2034
00000918: conv.i.v
0000091C: push.imm.e 461
00000920: conv.i.v
00000924: call action_create_object(argc=3)
0000092C: popz
00000930: push.imm.e 659
00000934: conv.i.v
00000938: push.imm.e 2064
0000093C: conv.i.v
00000940: push.imm.e 461
00000944: conv.i.v
00000948: call action_create_object(argc=3)
00000950: popz
00000954: push.imm.e 759
00000958: conv.i.v
0000095C: push.imm.e 2034
00000960: conv.i.v
00000964: push.imm.e 461
00000968: conv.i.v
0000096C: call action_create_object(argc=3)
00000974: popz
00000978: push.imm.e 859
0000097C: conv.i.v
00000980: push.imm.e 2024
00000984: conv.i.v
00000988: push.imm.e 461
0000098C: conv.i.v
00000990: call action_create_object(argc=3)
00000998: popz
0000099C: push.imm.e 959
000009A0: conv.i.v
000009A4: push.imm.e 2050
000009A8: conv.i.v
000009AC: push.imm.e 461
000009B0: conv.i.v
000009B4: call action_create_object(argc=3)
000009BC: popz
000009C0: push.imm.e 1059
000009C4: conv.i.v
000009C8: push.imm.e 2046
000009CC: conv.i.v
000009D0: push.imm.e 461
000009D4: conv.i.v
000009D8: call action_create_object(argc=3)
000009E0: popz
000009E4: push.imm.e 1159
000009E8: conv.i.v
000009EC: push.imm.e 2036
000009F0: conv.i.v
000009F4: push.imm.e 461
000009F8: conv.i.v
000009FC: call action_create_object(argc=3)
00000A04: popz
00000A08: push.imm.e 0
00000A0C: conv.i.v
00000A10: push.imm.e 1
00000A14: conv.i.v
00000A18: push.v stormeasy
00000A20: call action_if_variable(argc=3)
00000A28: pop.v.v local.__b__
00000A30: push.local.v local.__b__
00000A38: conv.v.b
00000A3C: bf 0x20C7764
00000A40: push.imm.e 4
00000A44: conv.i.v
00000A48: call action_if_dice(argc=1)
00000A50: pop.v.v local.__b__
00000A58: push.local.v local.__b__
00000A60: conv.v.b
00000A64: bf 0x20C7680
00000A68: push.imm.e 38
00000A6C: conv.i.v
00000A70: push.imm.e -381
00000A74: conv.i.v
00000A78: push.imm.e 459
00000A7C: conv.i.v
00000A80: call action_create_object(argc=3)
00000A88: popz
00000A8C: push.imm.e 3
00000A90: conv.i.v
00000A94: call action_if_dice(argc=1)
00000A9C: pop.v.v local.__b__
00000AA4: push.local.v local.__b__
00000AAC: conv.v.b
00000AB0: bf 0x20C76CC
00000AB4: push.imm.e 526
00000AB8: conv.i.v
00000ABC: push.imm.e -401
00000AC0: conv.i.v
00000AC4: push.imm.e 459
00000AC8: conv.i.v
00000ACC: call action_create_object(argc=3)
00000AD4: popz
00000AD8: push.imm.e 5
00000ADC: conv.i.v
00000AE0: call action_if_dice(argc=1)
00000AE8: pop.v.v local.__b__
00000AF0: push.local.v local.__b__
00000AF8: conv.v.b
00000AFC: bf 0x20C7718
00000B00: push.imm.e 982
00000B04: conv.i.v
00000B08: push.imm.e 420
00000B0C: conv.i.v
00000B10: push.imm.e 459
00000B14: conv.i.v
00000B18: call action_create_object(argc=3)
00000B20: popz
00000B24: push.imm.e 2
00000B28: conv.i.v
00000B2C: call action_if_dice(argc=1)
00000B34: pop.v.v local.__b__
00000B3C: push.local.v local.__b__
00000B44: conv.v.b
00000B48: bf 0x20C7764
00000B4C: push.imm.e 1132
00000B50: conv.i.v
00000B54: push.imm.e -232
00000B58: conv.i.v
00000B5C: push.imm.e 459
00000B60: conv.i.v
00000B64: call action_create_object(argc=3)
00000B6C: popz
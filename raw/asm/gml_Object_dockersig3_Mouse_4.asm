// gml_Object_dockersig3_Mouse_4  locals=2 args=0 len=2492
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
00000048: bf 0x20BB254
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v phase
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20BAE0C
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 651
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
000000DC: b 0x20BB254
000000E0: push.imm.e 156
000000E4: pushenv 0x20BAE50
000000E8: push.imm.e 4
000000EC: conv.i.v
000000F0: push.imm.e 15000
000000F4: conv.i.v
000000F8: push.v mon
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20BAE50
00000120: b 0x20BAE58
00000124: popenv 0x40BAE14
00000128: b 0x20BAE5C
0000012C: popenv 0x1CBAE58
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x20BB254
00000140: push.imm.e 156
00000144: pushenv 0x20BAEB0
00000148: push.imm.e 4
0000014C: conv.i.v
00000150: push.imm.e 27000
00000154: conv.i.v
00000158: push.v oil
00000160: call action_if_variable(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x20BAEB0
00000180: b 0x20BAEB8
00000184: popenv 0x40BAE74
00000188: b 0x20BAEBC
0000018C: popenv 0x1CBAEB8
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20BB254
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
000001F8: push.imm.e 109
000001FC: pushenv 0x20BAF38
00000200: call action_kill_object(argc=0)
00000208: popz
0000020C: popenv 0x40BAF2C
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
00000334: push.imm.e 4
00000338: conv.i.v
0000033C: push.imm.e 600
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
00000378: push.imm.e -1000
0000037C: conv.i.v
00000380: push.imm.e 5000
00000384: conv.i.v
00000388: push.imm.e 119
0000038C: conv.i.v
00000390: call action_create_object(argc=3)
00000398: popz
0000039C: push.imm.e 1
000003A0: conv.i.v
000003A4: call action_set_relative(argc=1)
000003AC: popz
000003B0: push.imm.e 0
000003B4: conv.i.v
000003B8: call action_set_relative(argc=1)
000003C0: popz
000003C4: push.imm.e 0
000003C8: conv.i.v
000003CC: push.imm.e 5000
000003D0: conv.i.v
000003D4: push.imm.e 119
000003D8: conv.i.v
000003DC: call action_create_object(argc=3)
000003E4: popz
000003E8: push.imm.e 1
000003EC: conv.i.v
000003F0: call action_set_relative(argc=1)
000003F8: popz
000003FC: push.imm.e 0
00000400: conv.i.v
00000404: call action_set_relative(argc=1)
0000040C: popz
00000410: push.imm.e 1000
00000414: conv.i.v
00000418: push.imm.e 5000
0000041C: conv.i.v
00000420: push.imm.e 119
00000424: conv.i.v
00000428: call action_create_object(argc=3)
00000430: popz
00000434: push.imm.e 1
00000438: conv.i.v
0000043C: call action_set_relative(argc=1)
00000444: popz
00000448: push.imm.e 0
0000044C: conv.i.v
00000450: call action_set_relative(argc=1)
00000458: popz
0000045C: push.imm.e 2000
00000460: conv.i.v
00000464: push.imm.e 5000
00000468: conv.i.v
0000046C: push.imm.e 119
00000470: conv.i.v
00000474: call action_create_object(argc=3)
0000047C: popz
00000480: push.imm.e 1
00000484: conv.i.v
00000488: call action_set_relative(argc=1)
00000490: popz
00000494: push.imm.e 0
00000498: conv.i.v
0000049C: call action_set_relative(argc=1)
000004A4: popz
000004A8: push.imm.e 3000
000004AC: conv.i.v
000004B0: push.imm.e 5000
000004B4: conv.i.v
000004B8: push.imm.e 119
000004BC: conv.i.v
000004C0: call action_create_object(argc=3)
000004C8: popz
000004CC: push.imm.e 1
000004D0: conv.i.v
000004D4: call action_set_relative(argc=1)
000004DC: popz
000004E0: push.imm.e 156
000004E4: pushenv 0x20BB22C
000004E8: push.v mon
000004F0: push.imm.e -15000
000004F4: add.i.v
000004F8: pop.v.v mon
00000500: popenv 0x40BB214
00000504: push.imm.e 156
00000508: pushenv 0x20BB250
0000050C: push.v oil
00000514: push.imm.e -27000
00000518: add.i.v
0000051C: pop.v.v oil
00000524: popenv 0x40BB238
00000528: push.imm.e 0
0000052C: conv.i.v
00000530: push.imm.e 0
00000534: conv.i.v
00000538: push.builtin.v os_type
00000540: call action_if_variable(argc=3)
00000548: pop.v.v local.__b__
00000550: push.local.v local.__b__
00000558: conv.v.b
0000055C: bf 0x20BB6D4
00000560: push.imm.e 156
00000564: pushenv 0x20BB2D0
00000568: push.imm.e 4
0000056C: conv.i.v
00000570: push.imm.e 15000
00000574: conv.i.v
00000578: push.v mon
00000580: call action_if_variable(argc=3)
00000588: pop.v.v local.__b__
00000590: push.local.v local.__b__
00000598: conv.v.b
0000059C: bf 0x20BB2D0
000005A0: b 0x20BB2D8
000005A4: popenv 0x40BB294
000005A8: b 0x20BB2DC
000005AC: popenv 0x1CBB2D8
000005B0: push.local.v local.__b__
000005B8: conv.v.b
000005BC: bf 0x20BB6D4
000005C0: push.imm.e 156
000005C4: pushenv 0x20BB330
000005C8: push.imm.e 4
000005CC: conv.i.v
000005D0: push.imm.e 27000
000005D4: conv.i.v
000005D8: push.v oil
000005E0: call action_if_variable(argc=3)
000005E8: pop.v.v local.__b__
000005F0: push.local.v local.__b__
000005F8: conv.v.b
000005FC: bf 0x20BB330
00000600: b 0x20BB338
00000604: popenv 0x40BB2F4
00000608: b 0x20BB33C
0000060C: popenv 0x1CBB338
00000610: push.local.v local.__b__
00000618: conv.v.b
0000061C: bf 0x20BB6D4
00000620: push.imm.e 0
00000624: conv.i.v
00000628: call action_set_relative(argc=1)
00000630: popz
00000634: push.imm.e 1
00000638: pop.v.i active
00000640: push.imm.e 1
00000644: conv.i.v
00000648: call action_set_relative(argc=1)
00000650: popz
00000654: push.imm.e 1
00000658: conv.i.v
0000065C: push.imm.e 0
00000660: conv.i.v
00000664: push.imm.e 518
00000668: conv.i.v
0000066C: call action_sprite_set(argc=3)
00000674: popz
00000678: push.imm.e 109
0000067C: pushenv 0x20BB3B8
00000680: call action_kill_object(argc=0)
00000688: popz
0000068C: popenv 0x40BB3AC
00000690: push.imm.e 0
00000694: conv.i.v
00000698: call action_set_relative(argc=1)
000006A0: popz
000006A4: push.imm.e 0
000006A8: conv.i.v
000006AC: push.imm.e 40
000006B0: conv.i.v
000006B4: call action_set_alarm(argc=2)
000006BC: popz
000006C0: push.imm.e 1
000006C4: conv.i.v
000006C8: call action_set_relative(argc=1)
000006D0: popz
000006D4: push.imm.e 0
000006D8: conv.i.v
000006DC: call action_set_relative(argc=1)
000006E4: popz
000006E8: push.imm.e 1
000006EC: conv.i.v
000006F0: push.imm.e 80
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
0000072C: push.imm.e 2
00000730: conv.i.v
00000734: push.imm.e 120
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
00000770: push.imm.e 3
00000774: conv.i.v
00000778: push.imm.e 160
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
000007B4: push.imm.e 4
000007B8: conv.i.v
000007BC: push.imm.e 600
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
000007F8: push.imm.e -1000
000007FC: conv.i.v
00000800: push.imm.e 5000
00000804: conv.i.v
00000808: push.imm.e 119
0000080C: conv.i.v
00000810: call action_create_object(argc=3)
00000818: popz
0000081C: push.imm.e 1
00000820: conv.i.v
00000824: call action_set_relative(argc=1)
0000082C: popz
00000830: push.imm.e 0
00000834: conv.i.v
00000838: call action_set_relative(argc=1)
00000840: popz
00000844: push.imm.e 0
00000848: conv.i.v
0000084C: push.imm.e 5000
00000850: conv.i.v
00000854: push.imm.e 119
00000858: conv.i.v
0000085C: call action_create_object(argc=3)
00000864: popz
00000868: push.imm.e 1
0000086C: conv.i.v
00000870: call action_set_relative(argc=1)
00000878: popz
0000087C: push.imm.e 0
00000880: conv.i.v
00000884: call action_set_relative(argc=1)
0000088C: popz
00000890: push.imm.e 1000
00000894: conv.i.v
00000898: push.imm.e 5000
0000089C: conv.i.v
000008A0: push.imm.e 119
000008A4: conv.i.v
000008A8: call action_create_object(argc=3)
000008B0: popz
000008B4: push.imm.e 1
000008B8: conv.i.v
000008BC: call action_set_relative(argc=1)
000008C4: popz
000008C8: push.imm.e 0
000008CC: conv.i.v
000008D0: call action_set_relative(argc=1)
000008D8: popz
000008DC: push.imm.e 2000
000008E0: conv.i.v
000008E4: push.imm.e 5000
000008E8: conv.i.v
000008EC: push.imm.e 119
000008F0: conv.i.v
000008F4: call action_create_object(argc=3)
000008FC: popz
00000900: push.imm.e 1
00000904: conv.i.v
00000908: call action_set_relative(argc=1)
00000910: popz
00000914: push.imm.e 0
00000918: conv.i.v
0000091C: call action_set_relative(argc=1)
00000924: popz
00000928: push.imm.e 3000
0000092C: conv.i.v
00000930: push.imm.e 5000
00000934: conv.i.v
00000938: push.imm.e 119
0000093C: conv.i.v
00000940: call action_create_object(argc=3)
00000948: popz
0000094C: push.imm.e 1
00000950: conv.i.v
00000954: call action_set_relative(argc=1)
0000095C: popz
00000960: push.imm.e 156
00000964: pushenv 0x20BB6AC
00000968: push.v mon
00000970: push.imm.e -15000
00000974: add.i.v
00000978: pop.v.v mon
00000980: popenv 0x40BB694
00000984: push.imm.e 156
00000988: pushenv 0x20BB6D0
0000098C: push.v oil
00000994: push.imm.e -27000
00000998: add.i.v
0000099C: pop.v.v oil
000009A4: popenv 0x40BB6B8
000009A8: push.imm.e 0
000009AC: conv.i.v
000009B0: call action_set_relative(argc=1)
000009B8: popz
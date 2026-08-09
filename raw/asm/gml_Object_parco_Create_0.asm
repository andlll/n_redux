// gml_Object_parco_Create_0  locals=2 args=0 len=2700
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 0
00000024: pop.v.i oversolar
0000002C: push.imm.e 156
00000030: pushenv 0x20D3BC8
00000034: push.imm.e 1
00000038: conv.i.v
0000003C: call action_set_relative(argc=1)
00000044: popz
00000048: push.v hap
00000050: push.imm.e 200
00000054: add.i.v
00000058: pop.v.v hap
00000060: push.imm.e 0
00000064: conv.i.v
00000068: call action_set_relative(argc=1)
00000070: popz
00000074: popenv 0x40D3B88
00000078: push.imm.e 455
0000007C: pushenv 0x20D3C10
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 1
0000008C: conv.i.v
00000090: push.v night
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x20D3C10
000000B8: b 0x20D3C18
000000BC: popenv 0x40D3BD4
000000C0: b 0x20D3C1C
000000C4: popenv 0x1CD3C18
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20D3C4C
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.i 16366009
000000E8: conv.i.v
000000EC: call action_sprite_color(argc=2)
000000F4: popz
000000F8: push.imm.e 455
000000FC: pushenv 0x20D3C90
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: push.v dawn
00000118: call action_if_variable(argc=3)
00000120: pop.v.v local.__b__
00000128: push.local.v local.__b__
00000130: conv.v.b
00000134: bf 0x20D3C90
00000138: b 0x20D3C98
0000013C: popenv 0x40D3C54
00000140: b 0x20D3C9C
00000144: popenv 0x1CD3C98
00000148: push.local.v local.__b__
00000150: conv.v.b
00000154: bf 0x20D3CCC
00000158: push.imm.e 1
0000015C: conv.i.v
00000160: push.i 15201023
00000168: conv.i.v
0000016C: call action_sprite_color(argc=2)
00000174: popz
00000178: push.imm.e 2
0000017C: conv.i.v
00000180: call action_if_dice(argc=1)
00000188: pop.v.v local.__b__
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20D3E0C
000001A0: push.imm.e 2
000001A4: conv.i.v
000001A8: call action_if_dice(argc=1)
000001B0: pop.v.v local.__b__
000001B8: push.local.v local.__b__
000001C0: conv.v.b
000001C4: bf 0x20D3D94
000001C8: push.imm.e 2
000001CC: conv.i.v
000001D0: call action_if_dice(argc=1)
000001D8: pop.v.v local.__b__
000001E0: push.local.v local.__b__
000001E8: conv.v.b
000001EC: bf 0x20D3D6C
000001F0: push.imm.e 1
000001F4: conv.i.v
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 339
00000204: conv.i.v
00000208: call action_sprite_set(argc=3)
00000210: popz
00000214: b 0x20D3D90
00000218: push.imm.e 1
0000021C: conv.i.v
00000220: push.imm.e 0
00000224: conv.i.v
00000228: push.imm.e 340
0000022C: conv.i.v
00000230: call action_sprite_set(argc=3)
00000238: popz
0000023C: b 0x20D3E08
00000240: push.imm.e 2
00000244: conv.i.v
00000248: call action_if_dice(argc=1)
00000250: pop.v.v local.__b__
00000258: push.local.v local.__b__
00000260: conv.v.b
00000264: bf 0x20D3DE4
00000268: push.imm.e 1
0000026C: conv.i.v
00000270: push.imm.e 0
00000274: conv.i.v
00000278: push.imm.e 341
0000027C: conv.i.v
00000280: call action_sprite_set(argc=3)
00000288: popz
0000028C: b 0x20D3E08
00000290: push.imm.e 1
00000294: conv.i.v
00000298: push.imm.e 0
0000029C: conv.i.v
000002A0: push.imm.e 342
000002A4: conv.i.v
000002A8: call action_sprite_set(argc=3)
000002B0: popz
000002B4: b 0x20D3F20
000002B8: push.imm.e 2
000002BC: conv.i.v
000002C0: call action_if_dice(argc=1)
000002C8: pop.v.v local.__b__
000002D0: push.local.v local.__b__
000002D8: conv.v.b
000002DC: bf 0x20D3EAC
000002E0: push.imm.e 2
000002E4: conv.i.v
000002E8: call action_if_dice(argc=1)
000002F0: pop.v.v local.__b__
000002F8: push.local.v local.__b__
00000300: conv.v.b
00000304: bf 0x20D3E84
00000308: push.imm.e 1
0000030C: conv.i.v
00000310: push.imm.e 0
00000314: conv.i.v
00000318: push.imm.e 343
0000031C: conv.i.v
00000320: call action_sprite_set(argc=3)
00000328: popz
0000032C: b 0x20D3EA8
00000330: push.imm.e 1
00000334: conv.i.v
00000338: push.imm.e 0
0000033C: conv.i.v
00000340: push.imm.e 344
00000344: conv.i.v
00000348: call action_sprite_set(argc=3)
00000350: popz
00000354: b 0x20D3F20
00000358: push.imm.e 2
0000035C: conv.i.v
00000360: call action_if_dice(argc=1)
00000368: pop.v.v local.__b__
00000370: push.local.v local.__b__
00000378: conv.v.b
0000037C: bf 0x20D3EFC
00000380: push.imm.e 1
00000384: conv.i.v
00000388: push.imm.e 0
0000038C: conv.i.v
00000390: push.imm.e 345
00000394: conv.i.v
00000398: call action_sprite_set(argc=3)
000003A0: popz
000003A4: b 0x20D3F20
000003A8: push.imm.e 1
000003AC: conv.i.v
000003B0: push.imm.e 0
000003B4: conv.i.v
000003B8: push.imm.e 346
000003BC: conv.i.v
000003C0: call action_sprite_set(argc=3)
000003C8: popz
000003CC: push.imm.e 4
000003D0: conv.i.v
000003D4: call action_if_dice(argc=1)
000003DC: pop.v.v local.__b__
000003E4: push.local.v local.__b__
000003EC: conv.v.b
000003F0: bf 0x20D400C
000003F4: push.imm.e 2
000003F8: conv.i.v
000003FC: call action_if_dice(argc=1)
00000404: pop.v.v local.__b__
0000040C: push.local.v local.__b__
00000414: conv.v.b
00000418: bf 0x20D3FC0
0000041C: push.imm.e 1
00000420: conv.i.v
00000424: call action_set_relative(argc=1)
0000042C: popz
00000430: push.imm.e 0
00000434: conv.i.v
00000438: push.imm.e 0
0000043C: conv.i.v
00000440: push.imm.e 472
00000444: conv.i.v
00000448: call action_create_object(argc=3)
00000450: popz
00000454: push.imm.e 0
00000458: conv.i.v
0000045C: call action_set_relative(argc=1)
00000464: popz
00000468: b 0x20D400C
0000046C: push.imm.e 1
00000470: conv.i.v
00000474: call action_set_relative(argc=1)
0000047C: popz
00000480: push.imm.e 0
00000484: conv.i.v
00000488: push.imm.e 0
0000048C: conv.i.v
00000490: push.imm.e 466
00000494: conv.i.v
00000498: call action_create_object(argc=3)
000004A0: popz
000004A4: push.imm.e 0
000004A8: conv.i.v
000004AC: call action_set_relative(argc=1)
000004B4: popz
000004B8: push.imm.e 2
000004BC: conv.i.v
000004C0: call action_if_dice(argc=1)
000004C8: pop.v.v local.__b__
000004D0: push.local.v local.__b__
000004D8: conv.v.b
000004DC: bf 0x20D40F8
000004E0: push.imm.e 2
000004E4: conv.i.v
000004E8: call action_if_dice(argc=1)
000004F0: pop.v.v local.__b__
000004F8: push.local.v local.__b__
00000500: conv.v.b
00000504: bf 0x20D40AC
00000508: push.imm.e 1
0000050C: conv.i.v
00000510: call action_set_relative(argc=1)
00000518: popz
0000051C: push.imm.e 10
00000520: conv.i.v
00000524: push.imm.e 40
00000528: conv.i.v
0000052C: push.imm.e 472
00000530: conv.i.v
00000534: call action_create_object(argc=3)
0000053C: popz
00000540: push.imm.e 0
00000544: conv.i.v
00000548: call action_set_relative(argc=1)
00000550: popz
00000554: b 0x20D40F8
00000558: push.imm.e 1
0000055C: conv.i.v
00000560: call action_set_relative(argc=1)
00000568: popz
0000056C: push.imm.e 10
00000570: conv.i.v
00000574: push.imm.e 40
00000578: conv.i.v
0000057C: push.imm.e 466
00000580: conv.i.v
00000584: call action_create_object(argc=3)
0000058C: popz
00000590: push.imm.e 0
00000594: conv.i.v
00000598: call action_set_relative(argc=1)
000005A0: popz
000005A4: push.imm.e 3
000005A8: conv.i.v
000005AC: call action_if_dice(argc=1)
000005B4: pop.v.v local.__b__
000005BC: push.local.v local.__b__
000005C4: conv.v.b
000005C8: bf 0x20D41E4
000005CC: push.imm.e 2
000005D0: conv.i.v
000005D4: call action_if_dice(argc=1)
000005DC: pop.v.v local.__b__
000005E4: push.local.v local.__b__
000005EC: conv.v.b
000005F0: bf 0x20D4198
000005F4: push.imm.e 1
000005F8: conv.i.v
000005FC: call action_set_relative(argc=1)
00000604: popz
00000608: push.imm.e 10
0000060C: conv.i.v
00000610: push.imm.e -40
00000614: conv.i.v
00000618: push.imm.e 472
0000061C: conv.i.v
00000620: call action_create_object(argc=3)
00000628: popz
0000062C: push.imm.e 0
00000630: conv.i.v
00000634: call action_set_relative(argc=1)
0000063C: popz
00000640: b 0x20D41E4
00000644: push.imm.e 1
00000648: conv.i.v
0000064C: call action_set_relative(argc=1)
00000654: popz
00000658: push.imm.e 10
0000065C: conv.i.v
00000660: push.imm.e -40
00000664: conv.i.v
00000668: push.imm.e 466
0000066C: conv.i.v
00000670: call action_create_object(argc=3)
00000678: popz
0000067C: push.imm.e 0
00000680: conv.i.v
00000684: call action_set_relative(argc=1)
0000068C: popz
00000690: push.imm.e 4
00000694: conv.i.v
00000698: call action_if_dice(argc=1)
000006A0: pop.v.v local.__b__
000006A8: push.local.v local.__b__
000006B0: conv.v.b
000006B4: bf 0x20D42D0
000006B8: push.imm.e 2
000006BC: conv.i.v
000006C0: call action_if_dice(argc=1)
000006C8: pop.v.v local.__b__
000006D0: push.local.v local.__b__
000006D8: conv.v.b
000006DC: bf 0x20D4284
000006E0: push.imm.e 1
000006E4: conv.i.v
000006E8: call action_set_relative(argc=1)
000006F0: popz
000006F4: push.imm.e -30
000006F8: conv.i.v
000006FC: push.imm.e 5
00000700: conv.i.v
00000704: push.imm.e 472
00000708: conv.i.v
0000070C: call action_create_object(argc=3)
00000714: popz
00000718: push.imm.e 0
0000071C: conv.i.v
00000720: call action_set_relative(argc=1)
00000728: popz
0000072C: b 0x20D42D0
00000730: push.imm.e 1
00000734: conv.i.v
00000738: call action_set_relative(argc=1)
00000740: popz
00000744: push.imm.e -30
00000748: conv.i.v
0000074C: push.imm.e 5
00000750: conv.i.v
00000754: push.imm.e 466
00000758: conv.i.v
0000075C: call action_create_object(argc=3)
00000764: popz
00000768: push.imm.e 0
0000076C: conv.i.v
00000770: call action_set_relative(argc=1)
00000778: popz
0000077C: push.imm.e 2
00000780: conv.i.v
00000784: call action_if_dice(argc=1)
0000078C: pop.v.v local.__b__
00000794: push.local.v local.__b__
0000079C: conv.v.b
000007A0: bf 0x20D43BC
000007A4: push.imm.e 2
000007A8: conv.i.v
000007AC: call action_if_dice(argc=1)
000007B4: pop.v.v local.__b__
000007BC: push.local.v local.__b__
000007C4: conv.v.b
000007C8: bf 0x20D4370
000007CC: push.imm.e 1
000007D0: conv.i.v
000007D4: call action_set_relative(argc=1)
000007DC: popz
000007E0: push.imm.e 40
000007E4: conv.i.v
000007E8: push.imm.e -7
000007EC: conv.i.v
000007F0: push.imm.e 472
000007F4: conv.i.v
000007F8: call action_create_object(argc=3)
00000800: popz
00000804: push.imm.e 0
00000808: conv.i.v
0000080C: call action_set_relative(argc=1)
00000814: popz
00000818: b 0x20D43BC
0000081C: push.imm.e 1
00000820: conv.i.v
00000824: call action_set_relative(argc=1)
0000082C: popz
00000830: push.imm.e 40
00000834: conv.i.v
00000838: push.imm.e -7
0000083C: conv.i.v
00000840: push.imm.e 466
00000844: conv.i.v
00000848: call action_create_object(argc=3)
00000850: popz
00000854: push.imm.e 0
00000858: conv.i.v
0000085C: call action_set_relative(argc=1)
00000864: popz
00000868: push.imm.e 4
0000086C: conv.i.v
00000870: call action_if_dice(argc=1)
00000878: pop.v.v local.__b__
00000880: push.local.v local.__b__
00000888: conv.v.b
0000088C: bf 0x20D44A8
00000890: push.imm.e 2
00000894: conv.i.v
00000898: call action_if_dice(argc=1)
000008A0: pop.v.v local.__b__
000008A8: push.local.v local.__b__
000008B0: conv.v.b
000008B4: bf 0x20D445C
000008B8: push.imm.e 1
000008BC: conv.i.v
000008C0: call action_set_relative(argc=1)
000008C8: popz
000008CC: push.imm.e 21
000008D0: conv.i.v
000008D4: push.imm.e 70
000008D8: conv.i.v
000008DC: push.imm.e 472
000008E0: conv.i.v
000008E4: call action_create_object(argc=3)
000008EC: popz
000008F0: push.imm.e 0
000008F4: conv.i.v
000008F8: call action_set_relative(argc=1)
00000900: popz
00000904: b 0x20D44A8
00000908: push.imm.e 1
0000090C: conv.i.v
00000910: call action_set_relative(argc=1)
00000918: popz
0000091C: push.imm.e 21
00000920: conv.i.v
00000924: push.imm.e 70
00000928: conv.i.v
0000092C: push.imm.e 466
00000930: conv.i.v
00000934: call action_create_object(argc=3)
0000093C: popz
00000940: push.imm.e 0
00000944: conv.i.v
00000948: call action_set_relative(argc=1)
00000950: popz
00000954: push.imm.e 3
00000958: conv.i.v
0000095C: call action_if_dice(argc=1)
00000964: pop.v.v local.__b__
0000096C: push.local.v local.__b__
00000974: conv.v.b
00000978: bf 0x20D4594
0000097C: push.imm.e 2
00000980: conv.i.v
00000984: call action_if_dice(argc=1)
0000098C: pop.v.v local.__b__
00000994: push.local.v local.__b__
0000099C: conv.v.b
000009A0: bf 0x20D4548
000009A4: push.imm.e 1
000009A8: conv.i.v
000009AC: call action_set_relative(argc=1)
000009B4: popz
000009B8: push.imm.e 7
000009BC: conv.i.v
000009C0: push.imm.e -80
000009C4: conv.i.v
000009C8: push.imm.e 472
000009CC: conv.i.v
000009D0: call action_create_object(argc=3)
000009D8: popz
000009DC: push.imm.e 0
000009E0: conv.i.v
000009E4: call action_set_relative(argc=1)
000009EC: popz
000009F0: b 0x20D4594
000009F4: push.imm.e 1
000009F8: conv.i.v
000009FC: call action_set_relative(argc=1)
00000A04: popz
00000A08: push.imm.e 7
00000A0C: conv.i.v
00000A10: push.imm.e -80
00000A14: conv.i.v
00000A18: push.imm.e 466
00000A1C: conv.i.v
00000A20: call action_create_object(argc=3)
00000A28: popz
00000A2C: push.imm.e 0
00000A30: conv.i.v
00000A34: call action_set_relative(argc=1)
00000A3C: popz
00000A40: push.v y
00000A48: neg.v.d
00000A4C: push.imm.e 100
00000A50: add.i.v
00000A54: pop.v.v depth
00000A5C: push.imm.e 0
00000A60: conv.i.v
00000A64: push.imm.e 67
00000A68: conv.i.v
00000A6C: call action_set_alarm(argc=2)
00000A74: popz
00000A78: push.imm.e 0
00000A7C: conv.i.v
00000A80: call action_set_relative(argc=1)
00000A88: popz
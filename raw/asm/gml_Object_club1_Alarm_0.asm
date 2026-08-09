// gml_Object_club1_Alarm_0  locals=2 args=0 len=1608
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 10
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: call action_if_dice(argc=1)
0000002C: pop.v.v local.__b__
00000034: push.local.v local.__b__
0000003C: conv.v.b
00000040: bf 0x20E95E8
00000044: push.imm.e 2
00000048: conv.i.v
0000004C: call action_if_dice(argc=1)
00000054: pop.v.v local.__b__
0000005C: push.local.v local.__b__
00000064: conv.v.b
00000068: bf 0x20E95C4
0000006C: push.imm.e 1
00000070: conv.i.v
00000074: push.imm.e 255
00000078: conv.i.v
0000007C: call action_sprite_color(argc=2)
00000084: popz
00000088: b 0x20E95E4
0000008C: push.imm.e 1
00000090: conv.i.v
00000094: push.i 16744448
0000009C: conv.i.v
000000A0: call action_sprite_color(argc=2)
000000A8: popz
000000AC: b 0x20E9654
000000B0: push.imm.e 2
000000B4: conv.i.v
000000B8: call action_if_dice(argc=1)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20E9634
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.i 65535
000000E8: conv.i.v
000000EC: call action_sprite_color(argc=2)
000000F4: popz
000000F8: b 0x20E9654
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: push.i 4259584
0000010C: conv.i.v
00000110: call action_sprite_color(argc=2)
00000118: popz
0000011C: push.imm.e 2
00000120: conv.i.v
00000124: call action_if_dice(argc=1)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x20E969C
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.imm.e 120
00000150: conv.i.v
00000154: call action_set_alarm(argc=2)
0000015C: popz
00000160: b 0x20E96B8
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: push.imm.e 150
00000170: conv.i.v
00000174: call action_set_alarm(argc=2)
0000017C: popz
00000180: push.v y
00000188: neg.v.d
0000018C: pop.v.v depth
00000194: push.imm.e 2
00000198: conv.i.v
0000019C: call action_if_dice(argc=1)
000001A4: pop.v.v local.__b__
000001AC: push.local.v local.__b__
000001B4: conv.v.b
000001B8: bf 0x20E994C
000001BC: push.imm.e 2
000001C0: conv.i.v
000001C4: call action_if_dice(argc=1)
000001CC: pop.v.v local.__b__
000001D4: push.local.v local.__b__
000001DC: conv.v.b
000001E0: bf 0x20E9834
000001E4: push.imm.e 2
000001E8: conv.i.v
000001EC: call action_if_dice(argc=1)
000001F4: pop.v.v local.__b__
000001FC: push.local.v local.__b__
00000204: conv.v.b
00000208: bf 0x20E97BC
0000020C: push.imm.e 2
00000210: conv.i.v
00000214: call action_if_dice(argc=1)
0000021C: pop.v.v local.__b__
00000224: push.local.v local.__b__
0000022C: conv.v.b
00000230: bf 0x20E9794
00000234: push.imm.e 1
00000238: conv.i.v
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: push.imm.e 578
00000248: conv.i.v
0000024C: call action_sprite_set(argc=3)
00000254: popz
00000258: b 0x20E97B8
0000025C: push.imm.e 1
00000260: conv.i.v
00000264: push.imm.e 0
00000268: conv.i.v
0000026C: push.imm.e 581
00000270: conv.i.v
00000274: call action_sprite_set(argc=3)
0000027C: popz
00000280: b 0x20E9830
00000284: push.imm.e 2
00000288: conv.i.v
0000028C: call action_if_dice(argc=1)
00000294: pop.v.v local.__b__
0000029C: push.local.v local.__b__
000002A4: conv.v.b
000002A8: bf 0x20E980C
000002AC: push.imm.e 1
000002B0: conv.i.v
000002B4: push.imm.e 0
000002B8: conv.i.v
000002BC: push.imm.e 584
000002C0: conv.i.v
000002C4: call action_sprite_set(argc=3)
000002CC: popz
000002D0: b 0x20E9830
000002D4: push.imm.e 1
000002D8: conv.i.v
000002DC: push.imm.e 0
000002E0: conv.i.v
000002E4: push.imm.e 587
000002E8: conv.i.v
000002EC: call action_sprite_set(argc=3)
000002F4: popz
000002F8: b 0x20E9948
000002FC: push.imm.e 2
00000300: conv.i.v
00000304: call action_if_dice(argc=1)
0000030C: pop.v.v local.__b__
00000314: push.local.v local.__b__
0000031C: conv.v.b
00000320: bf 0x20E98D4
00000324: push.imm.e 2
00000328: conv.i.v
0000032C: call action_if_dice(argc=1)
00000334: pop.v.v local.__b__
0000033C: push.local.v local.__b__
00000344: conv.v.b
00000348: bf 0x20E98AC
0000034C: push.imm.e 1
00000350: conv.i.v
00000354: push.imm.e 0
00000358: conv.i.v
0000035C: push.imm.e 590
00000360: conv.i.v
00000364: call action_sprite_set(argc=3)
0000036C: popz
00000370: b 0x20E98D0
00000374: push.imm.e 1
00000378: conv.i.v
0000037C: push.imm.e 0
00000380: conv.i.v
00000384: push.imm.e 593
00000388: conv.i.v
0000038C: call action_sprite_set(argc=3)
00000394: popz
00000398: b 0x20E9948
0000039C: push.imm.e 2
000003A0: conv.i.v
000003A4: call action_if_dice(argc=1)
000003AC: pop.v.v local.__b__
000003B4: push.local.v local.__b__
000003BC: conv.v.b
000003C0: bf 0x20E9924
000003C4: push.imm.e 1
000003C8: conv.i.v
000003CC: push.imm.e 0
000003D0: conv.i.v
000003D4: push.imm.e 596
000003D8: conv.i.v
000003DC: call action_sprite_set(argc=3)
000003E4: popz
000003E8: b 0x20E9948
000003EC: push.imm.e 1
000003F0: conv.i.v
000003F4: push.imm.e 0
000003F8: conv.i.v
000003FC: push.imm.e 599
00000400: conv.i.v
00000404: call action_sprite_set(argc=3)
0000040C: popz
00000410: b 0x20E9B80
00000414: push.imm.e 2
00000418: conv.i.v
0000041C: call action_if_dice(argc=1)
00000424: pop.v.v local.__b__
0000042C: push.local.v local.__b__
00000434: conv.v.b
00000438: bf 0x20E9A8C
0000043C: push.imm.e 2
00000440: conv.i.v
00000444: call action_if_dice(argc=1)
0000044C: pop.v.v local.__b__
00000454: push.local.v local.__b__
0000045C: conv.v.b
00000460: bf 0x20E9A14
00000464: push.imm.e 2
00000468: conv.i.v
0000046C: call action_if_dice(argc=1)
00000474: pop.v.v local.__b__
0000047C: push.local.v local.__b__
00000484: conv.v.b
00000488: bf 0x20E99EC
0000048C: push.imm.e 1
00000490: conv.i.v
00000494: push.imm.e 0
00000498: conv.i.v
0000049C: push.imm.e 602
000004A0: conv.i.v
000004A4: call action_sprite_set(argc=3)
000004AC: popz
000004B0: b 0x20E9A10
000004B4: push.imm.e 1
000004B8: conv.i.v
000004BC: push.imm.e 0
000004C0: conv.i.v
000004C4: push.imm.e 605
000004C8: conv.i.v
000004CC: call action_sprite_set(argc=3)
000004D4: popz
000004D8: b 0x20E9A88
000004DC: push.imm.e 2
000004E0: conv.i.v
000004E4: call action_if_dice(argc=1)
000004EC: pop.v.v local.__b__
000004F4: push.local.v local.__b__
000004FC: conv.v.b
00000500: bf 0x20E9A64
00000504: push.imm.e 1
00000508: conv.i.v
0000050C: push.imm.e 0
00000510: conv.i.v
00000514: push.imm.e 608
00000518: conv.i.v
0000051C: call action_sprite_set(argc=3)
00000524: popz
00000528: b 0x20E9A88
0000052C: push.imm.e 1
00000530: conv.i.v
00000534: push.imm.e 0
00000538: conv.i.v
0000053C: push.imm.e 611
00000540: conv.i.v
00000544: call action_sprite_set(argc=3)
0000054C: popz
00000550: b 0x20E9B80
00000554: push.imm.e 2
00000558: conv.i.v
0000055C: call action_if_dice(argc=1)
00000564: pop.v.v local.__b__
0000056C: push.local.v local.__b__
00000574: conv.v.b
00000578: bf 0x20E9B2C
0000057C: push.imm.e 2
00000580: conv.i.v
00000584: call action_if_dice(argc=1)
0000058C: pop.v.v local.__b__
00000594: push.local.v local.__b__
0000059C: conv.v.b
000005A0: bf 0x20E9B04
000005A4: push.imm.e 1
000005A8: conv.i.v
000005AC: push.imm.e 0
000005B0: conv.i.v
000005B4: push.imm.e 614
000005B8: conv.i.v
000005BC: call action_sprite_set(argc=3)
000005C4: popz
000005C8: b 0x20E9B28
000005CC: push.imm.e 1
000005D0: conv.i.v
000005D4: push.imm.e 0
000005D8: conv.i.v
000005DC: push.imm.e 617
000005E0: conv.i.v
000005E4: call action_sprite_set(argc=3)
000005EC: popz
000005F0: b 0x20E9B80
000005F4: push.imm.e 2
000005F8: conv.i.v
000005FC: call action_if_dice(argc=1)
00000604: pop.v.v local.__b__
0000060C: push.local.v local.__b__
00000614: conv.v.b
00000618: bf 0x20E9B7C
0000061C: push.imm.e 1
00000620: conv.i.v
00000624: push.imm.e 0
00000628: conv.i.v
0000062C: push.imm.e 620
00000630: conv.i.v
00000634: call action_sprite_set(argc=3)
0000063C: popz
00000640: b 0x20E9B80
00000644: exit
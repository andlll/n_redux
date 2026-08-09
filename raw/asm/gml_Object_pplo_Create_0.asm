// gml_Object_pplo_Create_0  locals=2 args=0 len=1116
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x213C624
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x213C5FC
00000050: push.d 0.5
0000005C: conv.d.v
00000060: push.imm.e 30
00000064: conv.i.v
00000068: call action_set_motion(argc=2)
00000070: popz
00000074: b 0x213C620
00000078: push.d 0.5
00000084: conv.d.v
00000088: push.imm.e 330
0000008C: conv.i.v
00000090: call action_set_motion(argc=2)
00000098: popz
0000009C: b 0x213C698
000000A0: push.imm.e 2
000000A4: conv.i.v
000000A8: call action_if_dice(argc=1)
000000B0: pop.v.v local.__b__
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x213C674
000000C8: push.d 0.5
000000D4: conv.d.v
000000D8: push.imm.e 150
000000DC: conv.i.v
000000E0: call action_set_motion(argc=2)
000000E8: popz
000000EC: b 0x213C698
000000F0: push.d 0.5
000000FC: conv.d.v
00000100: push.imm.e 210
00000104: conv.i.v
00000108: call action_set_motion(argc=2)
00000110: popz
00000114: push.imm.e 2
00000118: conv.i.v
0000011C: call action_if_dice(argc=1)
00000124: pop.v.v local.__b__
0000012C: push.local.v local.__b__
00000134: conv.v.b
00000138: bf 0x213C728
0000013C: push.imm.e 2
00000140: conv.i.v
00000144: call action_if_dice(argc=1)
0000014C: pop.v.v local.__b__
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x213C708
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: push.imm.e 58
00000170: conv.i.v
00000174: call action_set_alarm(argc=2)
0000017C: popz
00000180: b 0x213C724
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 73
00000190: conv.i.v
00000194: call action_set_alarm(argc=2)
0000019C: popz
000001A0: b 0x213C9E0
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: push.imm.e 36
000001B0: conv.i.v
000001B4: call action_set_alarm(argc=2)
000001BC: popz
000001C0: push.imm.e 2
000001C4: conv.i.v
000001C8: call action_if_dice(argc=1)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x213C78C
000001E8: push.imm.e 0
000001EC: conv.i.v
000001F0: push.imm.e 83
000001F4: conv.i.v
000001F8: call action_set_alarm(argc=2)
00000200: popz
00000204: b 0x213C78C
00000208: push.imm.e 2
0000020C: conv.i.v
00000210: call action_if_dice(argc=1)
00000218: pop.v.v local.__b__
00000220: push.local.v local.__b__
00000228: conv.v.b
0000022C: bf 0x213C8CC
00000230: push.imm.e 2
00000234: conv.i.v
00000238: call action_if_dice(argc=1)
00000240: pop.v.v local.__b__
00000248: push.local.v local.__b__
00000250: conv.v.b
00000254: bf 0x213C854
00000258: push.imm.e 2
0000025C: conv.i.v
00000260: call action_if_dice(argc=1)
00000268: pop.v.v local.__b__
00000270: push.local.v local.__b__
00000278: conv.v.b
0000027C: bf 0x213C82C
00000280: push.imm.e 1
00000284: conv.i.v
00000288: push.imm.e 0
0000028C: conv.i.v
00000290: push.imm.e 1052
00000294: conv.i.v
00000298: call action_sprite_set(argc=3)
000002A0: popz
000002A4: b 0x213C850
000002A8: push.imm.e 1
000002AC: conv.i.v
000002B0: push.imm.e 0
000002B4: conv.i.v
000002B8: push.imm.e 1053
000002BC: conv.i.v
000002C0: call action_sprite_set(argc=3)
000002C8: popz
000002CC: b 0x213C8C8
000002D0: push.imm.e 2
000002D4: conv.i.v
000002D8: call action_if_dice(argc=1)
000002E0: pop.v.v local.__b__
000002E8: push.local.v local.__b__
000002F0: conv.v.b
000002F4: bf 0x213C8A4
000002F8: push.imm.e 1
000002FC: conv.i.v
00000300: push.imm.e 0
00000304: conv.i.v
00000308: push.imm.e 1054
0000030C: conv.i.v
00000310: call action_sprite_set(argc=3)
00000318: popz
0000031C: b 0x213C8C8
00000320: push.imm.e 1
00000324: conv.i.v
00000328: push.imm.e 0
0000032C: conv.i.v
00000330: push.imm.e 1055
00000334: conv.i.v
00000338: call action_sprite_set(argc=3)
00000340: popz
00000344: b 0x213C9E0
00000348: push.imm.e 2
0000034C: conv.i.v
00000350: call action_if_dice(argc=1)
00000358: pop.v.v local.__b__
00000360: push.local.v local.__b__
00000368: conv.v.b
0000036C: bf 0x213C96C
00000370: push.imm.e 2
00000374: conv.i.v
00000378: call action_if_dice(argc=1)
00000380: pop.v.v local.__b__
00000388: push.local.v local.__b__
00000390: conv.v.b
00000394: bf 0x213C944
00000398: push.imm.e 1
0000039C: conv.i.v
000003A0: push.imm.e 0
000003A4: conv.i.v
000003A8: push.imm.e 1056
000003AC: conv.i.v
000003B0: call action_sprite_set(argc=3)
000003B8: popz
000003BC: b 0x213C968
000003C0: push.imm.e 1
000003C4: conv.i.v
000003C8: push.imm.e 0
000003CC: conv.i.v
000003D0: push.imm.e 1057
000003D4: conv.i.v
000003D8: call action_sprite_set(argc=3)
000003E0: popz
000003E4: b 0x213C9E0
000003E8: push.imm.e 2
000003EC: conv.i.v
000003F0: call action_if_dice(argc=1)
000003F8: pop.v.v local.__b__
00000400: push.local.v local.__b__
00000408: conv.v.b
0000040C: bf 0x213C9BC
00000410: push.imm.e 1
00000414: conv.i.v
00000418: push.imm.e 0
0000041C: conv.i.v
00000420: push.imm.e 1060
00000424: conv.i.v
00000428: call action_sprite_set(argc=3)
00000430: popz
00000434: b 0x213C9E0
00000438: push.imm.e 1
0000043C: conv.i.v
00000440: push.imm.e 0
00000444: conv.i.v
00000448: push.imm.e 1051
0000044C: conv.i.v
00000450: call action_sprite_set(argc=3)
00000458: popz
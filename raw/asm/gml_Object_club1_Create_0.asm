// gml_Object_club1_Create_0  locals=2 args=0 len=1184
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 2
00000024: conv.i.v
00000028: call action_if_dice(argc=1)
00000030: pop.v.v local.__b__
00000038: push.local.v local.__b__
00000040: conv.v.b
00000044: bf 0x20E902C
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: call action_if_dice(argc=1)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20E8FAC
00000070: push.imm.e 1
00000074: conv.i.v
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 519
00000084: conv.i.v
00000088: call action_sprite_set(argc=3)
00000090: popz
00000094: push.imm.e 2
00000098: pop.v.i xi
000000A0: push.imm.e 1
000000A4: conv.i.v
000000A8: call action_set_relative(argc=1)
000000B0: popz
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: push.imm.e 439
000000C8: conv.i.v
000000CC: call action_create_object(argc=3)
000000D4: popz
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: call action_set_relative(argc=1)
000000E8: popz
000000EC: b 0x20E9028
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: push.imm.e 0
000000FC: conv.i.v
00000100: push.imm.e 521
00000104: conv.i.v
00000108: call action_sprite_set(argc=3)
00000110: popz
00000114: push.imm.e 3
00000118: pop.v.i xi
00000120: push.imm.e 1
00000124: conv.i.v
00000128: call action_set_relative(argc=1)
00000130: popz
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 440
00000148: conv.i.v
0000014C: call action_create_object(argc=3)
00000154: popz
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: call action_set_relative(argc=1)
00000168: popz
0000016C: b 0x20E9150
00000170: push.imm.e 2
00000174: conv.i.v
00000178: call action_if_dice(argc=1)
00000180: pop.v.v local.__b__
00000188: push.local.v local.__b__
00000190: conv.v.b
00000194: bf 0x20E90D4
00000198: push.imm.e 1
0000019C: conv.i.v
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.imm.e 523
000001AC: conv.i.v
000001B0: call action_sprite_set(argc=3)
000001B8: popz
000001BC: push.imm.e 1
000001C0: pop.v.i xi
000001C8: push.imm.e 1
000001CC: conv.i.v
000001D0: call action_set_relative(argc=1)
000001D8: popz
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 441
000001F0: conv.i.v
000001F4: call action_create_object(argc=3)
000001FC: popz
00000200: push.imm.e 0
00000204: conv.i.v
00000208: call action_set_relative(argc=1)
00000210: popz
00000214: b 0x20E9150
00000218: push.imm.e 1
0000021C: conv.i.v
00000220: push.imm.e 0
00000224: conv.i.v
00000228: push.imm.e 525
0000022C: conv.i.v
00000230: call action_sprite_set(argc=3)
00000238: popz
0000023C: push.imm.e 4
00000240: pop.v.i xi
00000248: push.imm.e 1
0000024C: conv.i.v
00000250: call action_set_relative(argc=1)
00000258: popz
0000025C: push.imm.e 0
00000260: conv.i.v
00000264: push.imm.e 0
00000268: conv.i.v
0000026C: push.imm.e 442
00000270: conv.i.v
00000274: call action_create_object(argc=3)
0000027C: popz
00000280: push.imm.e 0
00000284: conv.i.v
00000288: call action_set_relative(argc=1)
00000290: popz
00000294: push.imm.e 1
00000298: conv.i.v
0000029C: call action_set_relative(argc=1)
000002A4: popz
000002A8: push.imm.e 0
000002AC: conv.i.v
000002B0: push.imm.e 0
000002B4: conv.i.v
000002B8: push.imm.e 236
000002BC: conv.i.v
000002C0: call action_create_object(argc=3)
000002C8: popz
000002CC: push.imm.e 0
000002D0: conv.i.v
000002D4: call action_set_relative(argc=1)
000002DC: popz
000002E0: push.imm.e 455
000002E4: pushenv 0x20E91E0
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: push.imm.e 1
000002F4: conv.i.v
000002F8: push.v night
00000300: call action_if_variable(argc=3)
00000308: pop.v.v local.__b__
00000310: push.local.v local.__b__
00000318: conv.v.b
0000031C: bf 0x20E91E0
00000320: b 0x20E91E8
00000324: popenv 0x40E91A4
00000328: b 0x20E91EC
0000032C: popenv 0x1CE91E8
00000330: push.local.v local.__b__
00000338: conv.v.b
0000033C: bf 0x20E921C
00000340: push.imm.e 1
00000344: conv.i.v
00000348: push.i 16366009
00000350: conv.i.v
00000354: call action_sprite_color(argc=2)
0000035C: popz
00000360: push.imm.e 455
00000364: pushenv 0x20E9260
00000368: push.imm.e 0
0000036C: conv.i.v
00000370: push.imm.e 1
00000374: conv.i.v
00000378: push.v dawn
00000380: call action_if_variable(argc=3)
00000388: pop.v.v local.__b__
00000390: push.local.v local.__b__
00000398: conv.v.b
0000039C: bf 0x20E9260
000003A0: b 0x20E9268
000003A4: popenv 0x40E9224
000003A8: b 0x20E926C
000003AC: popenv 0x1CE9268
000003B0: push.local.v local.__b__
000003B8: conv.v.b
000003BC: bf 0x20E929C
000003C0: push.imm.e 1
000003C4: conv.i.v
000003C8: push.i 15201023
000003D0: conv.i.v
000003D4: call action_sprite_color(argc=2)
000003DC: popz
000003E0: push.imm.e 156
000003E4: pushenv 0x20E92E4
000003E8: push.imm.e 1
000003EC: conv.i.v
000003F0: call action_set_relative(argc=1)
000003F8: popz
000003FC: push.v wewe
00000404: push.imm.e 20
00000408: add.i.v
0000040C: pop.v.v wewe
00000414: push.imm.e 0
00000418: conv.i.v
0000041C: call action_set_relative(argc=1)
00000424: popz
00000428: popenv 0x40E92A4
0000042C: push.imm.e 0
00000430: pop.v.i deming
00000438: push.imm.e 0
0000043C: pop.v.i arp
00000444: push.imm.e 5
00000448: conv.i.v
0000044C: push.imm.e 35
00000450: conv.i.v
00000454: call action_set_alarm(argc=2)
0000045C: popz
00000460: push.imm.e 50
00000464: pop.v.i life
0000046C: push.imm.e 0
00000470: pop.v.i upo
00000478: push.v y
00000480: neg.v.d
00000484: pop.v.v depth
0000048C: push.imm.e 0
00000490: conv.i.v
00000494: call action_set_relative(argc=1)
0000049C: popz
// gml_Object_media1d_Create_0  locals=2 args=0 len=996
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 1
00000024: conv.i.v
00000028: call action_set_relative(argc=1)
00000030: popz
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 236
00000048: conv.i.v
0000004C: call action_create_object(argc=3)
00000054: popz
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: call action_set_relative(argc=1)
00000068: popz
0000006C: push.imm.e 455
00000070: pushenv 0x20DCE4C
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 1
00000080: conv.i.v
00000084: push.v night
0000008C: call action_if_variable(argc=3)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20DCE4C
000000AC: b 0x20DCE54
000000B0: popenv 0x40DCE10
000000B4: b 0x20DCE58
000000B8: popenv 0x1CDCE54
000000BC: push.local.v local.__b__
000000C4: conv.v.b
000000C8: bf 0x20DCE88
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: push.i 16366009
000000DC: conv.i.v
000000E0: call action_sprite_color(argc=2)
000000E8: popz
000000EC: push.imm.e 455
000000F0: pushenv 0x20DCECC
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: push.v dawn
0000010C: call action_if_variable(argc=3)
00000114: pop.v.v local.__b__
0000011C: push.local.v local.__b__
00000124: conv.v.b
00000128: bf 0x20DCECC
0000012C: b 0x20DCED4
00000130: popenv 0x40DCE90
00000134: b 0x20DCED8
00000138: popenv 0x1CDCED4
0000013C: push.local.v local.__b__
00000144: conv.v.b
00000148: bf 0x20DCF08
0000014C: push.imm.e 1
00000150: conv.i.v
00000154: push.i 15201023
0000015C: conv.i.v
00000160: call action_sprite_color(argc=2)
00000168: popz
0000016C: push.imm.e 2
00000170: conv.i.v
00000174: push.imm.e 2000
00000178: conv.i.v
0000017C: call action_set_alarm(argc=2)
00000184: popz
00000188: push.imm.e 4
0000018C: conv.i.v
00000190: push.imm.e 600
00000194: conv.i.v
00000198: call action_set_alarm(argc=2)
000001A0: popz
000001A4: push.imm.e 6
000001A8: conv.i.v
000001AC: push.imm.e 960
000001B0: conv.i.v
000001B4: call action_set_alarm(argc=2)
000001BC: popz
000001C0: push.imm.e 5
000001C4: conv.i.v
000001C8: push.imm.e 34
000001CC: conv.i.v
000001D0: call action_set_alarm(argc=2)
000001D8: popz
000001DC: push.imm.e 3
000001E0: conv.i.v
000001E4: push.imm.e 120
000001E8: conv.i.v
000001EC: call action_set_alarm(argc=2)
000001F4: popz
000001F8: push.imm.e 0
000001FC: pop.v.i ava
00000204: push.imm.e 156
00000208: pushenv 0x20DCFE8
0000020C: push.imm.e 1
00000210: conv.i.v
00000214: call action_set_relative(argc=1)
0000021C: popz
00000220: push.v hap
00000228: push.imm.e 1200
0000022C: add.i.v
00000230: pop.v.v hap
00000238: push.imm.e 0
0000023C: conv.i.v
00000240: call action_set_relative(argc=1)
00000248: popz
0000024C: popenv 0x40DCFA8
00000250: push.imm.e 350
00000254: pop.v.i life
0000025C: push.imm.e 156
00000260: pushenv 0x20DD040
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: call action_set_relative(argc=1)
00000274: popz
00000278: push.v wewe
00000280: push.imm.e 150
00000284: add.i.v
00000288: pop.v.v wewe
00000290: push.imm.e 0
00000294: conv.i.v
00000298: call action_set_relative(argc=1)
000002A0: popz
000002A4: popenv 0x40DD000
000002A8: push.v y
000002B0: neg.v.d
000002B4: push.imm.e 3
000002B8: add.i.v
000002BC: pop.v.v depth
000002C4: push.imm.e 2
000002C8: conv.i.v
000002CC: call action_if_dice(argc=1)
000002D4: pop.v.v local.__b__
000002DC: push.local.v local.__b__
000002E4: conv.v.b
000002E8: bf 0x20DD0FC
000002EC: push.imm.e 1
000002F0: conv.i.v
000002F4: call action_set_relative(argc=1)
000002FC: popz
00000300: push.imm.e 0
00000304: conv.i.v
00000308: push.imm.e 0
0000030C: conv.i.v
00000310: push.imm.e 385
00000314: conv.i.v
00000318: call action_create_object(argc=3)
00000320: popz
00000324: push.imm.e 0
00000328: conv.i.v
0000032C: call action_set_relative(argc=1)
00000334: popz
00000338: push.imm.e 1
0000033C: conv.i.v
00000340: push.imm.e 0
00000344: conv.i.v
00000348: push.imm.e 382
0000034C: conv.i.v
00000350: call action_sprite_set(argc=3)
00000358: popz
0000035C: b 0x20DD16C
00000360: push.imm.e 1
00000364: conv.i.v
00000368: call action_set_relative(argc=1)
00000370: popz
00000374: push.imm.e 0
00000378: conv.i.v
0000037C: push.imm.e 0
00000380: conv.i.v
00000384: push.imm.e 386
00000388: conv.i.v
0000038C: call action_create_object(argc=3)
00000394: popz
00000398: push.imm.e 0
0000039C: conv.i.v
000003A0: call action_set_relative(argc=1)
000003A8: popz
000003AC: push.imm.e 1
000003B0: conv.i.v
000003B4: push.imm.e 0
000003B8: conv.i.v
000003BC: push.imm.e 387
000003C0: conv.i.v
000003C4: call action_sprite_set(argc=3)
000003CC: popz
000003D0: push.imm.e 0
000003D4: conv.i.v
000003D8: call action_set_relative(argc=1)
000003E0: popz
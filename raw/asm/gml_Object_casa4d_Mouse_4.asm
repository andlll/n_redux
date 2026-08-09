// gml_Object_casa4d_Mouse_4  locals=2 args=0 len=432
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20E2B18
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20E2B18
00000054: b 0x20E2B20
00000058: popenv 0x40E2ADC
0000005C: b 0x20E2B24
00000060: popenv 0x1CE2B20
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20E2C5C
00000074: push.imm.e 156
00000078: pushenv 0x20E2B78
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.imm.e 20000
00000088: conv.i.v
0000008C: push.v mon
00000094: call action_if_variable(argc=3)
0000009C: pop.v.v local.__b__
000000A4: push.local.v local.__b__
000000AC: conv.v.b
000000B0: bf 0x20E2B78
000000B4: b 0x20E2B80
000000B8: popenv 0x40E2B3C
000000BC: b 0x20E2B84
000000C0: popenv 0x1CE2B80
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x20E2C5C
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 0
000000E0: conv.i.v
000000E4: push.imm.e 127
000000E8: conv.i.v
000000EC: call action_if_number(argc=3)
000000F4: pop.v.v local.__b__
000000FC: push.local.v local.__b__
00000104: conv.v.b
00000108: bf 0x20E2C5C
0000010C: push.imm.e 1
00000110: pop.v.i redder
00000118: push.imm.e 1
0000011C: conv.i.v
00000120: call action_set_relative(argc=1)
00000128: popz
0000012C: push.imm.e 0
00000130: conv.i.v
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 127
00000140: conv.i.v
00000144: call action_create_object(argc=3)
0000014C: popz
00000150: push.imm.e 0
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz
00000164: push.imm.e 9
00000168: conv.i.v
0000016C: push.imm.e 2
00000170: conv.i.v
00000174: call action_set_alarm(argc=2)
0000017C: popz
00000180: push.imm.e 1
00000184: conv.i.v
00000188: push.imm.e 255
0000018C: conv.i.v
00000190: call action_sprite_color(argc=2)
00000198: popz
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: call action_set_relative(argc=1)
000001AC: popz
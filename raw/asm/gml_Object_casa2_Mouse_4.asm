// gml_Object_casa2_Mouse_4  locals=2 args=0 len=376
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20D7ED0
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20D7ED0
00000054: b 0x20D7ED8
00000058: popenv 0x40D7E94
0000005C: b 0x20D7EDC
00000060: popenv 0x1CD7ED8
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20D7FDC
00000074: push.imm.e 156
00000078: pushenv 0x20D7F30
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.imm.e 2000
00000088: conv.i.v
0000008C: push.v mon
00000094: call action_if_variable(argc=3)
0000009C: pop.v.v local.__b__
000000A4: push.local.v local.__b__
000000AC: conv.v.b
000000B0: bf 0x20D7F30
000000B4: b 0x20D7F38
000000B8: popenv 0x40D7EF4
000000BC: b 0x20D7F3C
000000C0: popenv 0x1CD7F38
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x20D7FDC
000000D4: push.imm.e 1
000000D8: pop.v.i redder
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: call action_set_relative(argc=1)
000000F0: popz
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: push.imm.e 127
00000108: conv.i.v
0000010C: call action_create_object(argc=3)
00000114: popz
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: call action_set_relative(argc=1)
00000128: popz
0000012C: push.imm.e 9
00000130: conv.i.v
00000134: push.imm.e 2
00000138: conv.i.v
0000013C: call action_set_alarm(argc=2)
00000144: popz
00000148: push.imm.e 1
0000014C: conv.i.v
00000150: push.imm.e 255
00000154: conv.i.v
00000158: call action_sprite_color(argc=2)
00000160: popz
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: call action_set_relative(argc=1)
00000174: popz
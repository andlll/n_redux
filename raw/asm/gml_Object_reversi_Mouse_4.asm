// gml_Object_reversi_Mouse_4  locals=2 args=0 len=620
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 617
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21EE1AC
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 8
0000004C: conv.i.v
00000050: call action_if_number(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x21EE1AC
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 9
00000084: conv.i.v
00000088: call action_if_number(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x21EE1AC
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: push.imm.e 10
000000BC: conv.i.v
000000C0: call action_if_number(argc=3)
000000C8: pop.v.v local.__b__
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x21EE1AC
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 11
000000F4: conv.i.v
000000F8: call action_if_number(argc=3)
00000100: pop.v.v local.__b__
00000108: push.local.v local.__b__
00000110: conv.v.b
00000114: bf 0x21EE1AC
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: push.imm.e 0
00000124: conv.i.v
00000128: push.imm.e 7
0000012C: conv.i.v
00000130: call action_if_number(argc=3)
00000138: pop.v.v local.__b__
00000140: push.local.v local.__b__
00000148: conv.v.b
0000014C: bf 0x21EE1AC
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: push.imm.e 736
00000164: conv.i.v
00000168: call action_if_number(argc=3)
00000170: pop.v.v local.__b__
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x21EE138
00000188: push.s "nimsav"
00000190: conv.s.v
00000194: call action_save_game(argc=1)
0000019C: popz
000001A0: push.imm.e 2
000001A4: conv.i.v
000001A8: push.imm.e 0
000001AC: conv.i.v
000001B0: push.imm.e 736
000001B4: conv.i.v
000001B8: call action_if_number(argc=3)
000001C0: pop.v.v local.__b__
000001C8: push.local.v local.__b__
000001D0: conv.v.b
000001D4: bf 0x21EE188
000001D8: push.s "nimsav_eas"
000001E0: conv.s.v
000001E4: call action_save_game(argc=1)
000001EC: popz
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 463
00000204: conv.i.v
00000208: call action_create_object(argc=3)
00000210: popz
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.imm.e 717
00000228: conv.i.v
0000022C: call action_create_object(argc=3)
00000234: popz
00000238: push.imm.e 156
0000023C: pushenv 0x21EE1E4
00000240: push.imm.e 1
00000244: pop.v.i exiting
0000024C: popenv 0x41EE1D8
00000250: push.imm.e 0
00000254: conv.i.v
00000258: push.imm.e 30
0000025C: conv.i.v
00000260: call action_set_alarm(argc=2)
00000268: popz